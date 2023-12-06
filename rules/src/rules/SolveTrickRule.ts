import { Material, MaterialMove, MaterialRulesPart, RuleMove } from '@gamepark/rules-api'
import Animal, { getAnimalPower, isEagle, isElephant, isHyena, isMouse, sameSuit } from '../material/Animal'
import Heir from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EagleChoice } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SolveTrickRule extends MaterialRulesPart<Heir, MaterialType, LocationType> {

  onRuleStart(_move: RuleMove) {
    const lead = this.lead
    const opponent = this.lead === Heir.BlackPanther ? Heir.WhiteTiger : Heir.BlackPanther

    const leadCard = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea).player(lead).getItem()!
    const opponentCard = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea).player(opponent).getItem()!

    const winnerAnimal = this.getWinnerAnimal(leadCard.id, opponentCard.id)
    const winner = winnerAnimal === leadCard.id ? lead : opponent
    const cards = this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayArea)
    const moves: MaterialMove[] = cards
      .getIndexes()
      .flatMap((index) => {
        const card = cards.index(index)
        if (this.hasRanAway) {
          this.memorize(Memory.Lead, lead)
          return this.runaway(card, lead, opponent)
        }

        this.memorize(Memory.Lead, winner)
        return this.solve(card, winner)
      })

    moves.push(this.rules().startRule(RuleId.EndOfTurn))

    return moves
  }

  runaway(card: Material, lead: Heir, opponent: Heir) {
    const item = card.getItem()!
    if (opponent === item.location.player) {
      return card.moveItems({
        type: LocationType.PlayerTrickStack,
        player: item.location.player
      })
    }

    return this.solve(card, lead)
  }

  solve(card: Material, winner: Heir) {
    const item = card.getItem()!
    const opponent = winner === Heir.BlackPanther ? Heir.WhiteTiger : Heir.BlackPanther
    const hyenasInDeck = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).id(isHyena).player(opponent)
    const hyenasInTrick = this.material(MaterialType.AnimalCard).location(LocationType.PlayerTrickStack).id(isHyena).player(opponent)
    isHyena(item.id) && console.log(isHyena(item.id), opponent, hyenasInDeck.length, hyenasInTrick.length)
    if (isHyena(item.id) && !hyenasInDeck.length && !hyenasInTrick.length) {
      return card.moveItems({
        type: LocationType.PlayerHyena,
        player: winner
      })
    }

    const moves: MaterialMove[] = []
    if (isHyena(item.id) && hyenasInDeck.length) {
      moves.push(
        ...hyenasInDeck.moveItems({ type: LocationType.PlayerTrickStack, player: opponent }),
        ...this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(winner).moveItems({ type: LocationType.PlayerTrickStack, player: winner })
      )
    }

    moves.push(
      ...card.moveItems({
        type: LocationType.PlayerTrickStack,
        player: winner
      })
    )

    return moves
  }

  get hasRanAway() {
    return this.remind(Memory.Eagle) === EagleChoice.Runaway
  }

  getWinnerAnimal(animal1: Animal, animal2: Animal) {

    if (sameSuit(animal1, animal2)) {
      if (isMouse(animal1) && isElephant(animal2)) {
        return animal1
      } else if (isMouse(animal2) && isElephant(animal1)) {
        return animal2
      } else {
        return getAnimalPower(animal1) > getAnimalPower(animal2)
          ? animal1
          : animal2
      }
    } else {
      if (isEagle(animal1) || isEagle(animal2)) {
        return getAnimalPower(animal1) > getAnimalPower(animal2)
          ? animal1
          : animal2
      }
      return animal1
    }

  }

  onRuleEnd() {
    this.forget(Memory.Eagle)
    return []
  }

  get lead() {
    return this.remind(Memory.Lead)
  }

}
