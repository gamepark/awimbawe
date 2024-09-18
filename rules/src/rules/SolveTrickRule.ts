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
    const moves: MaterialMove[] = []

    moves.push(...this.flipTrickCards())
    moves.push(...this.placeHyenasInTrick(cards, winner))

    moves.push(
      ...cards
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
    )

    moves.push(this.startRule(RuleId.EndOfTurn))

    return moves
  }

  private flipTrickCards() {
    const visibleCardsInDeck = this.material(MaterialType.AnimalCard).location(LocationType.PlayerTrickStack).rotation((r) => !r).sort((item) => -item.location.x!)
    return visibleCardsInDeck.moveItems({ rotation: true })
  }

  private placeHyenasInTrick(cards: Material, winner: Heir) {
    const moves: MaterialMove[] = []
    const opponent = winner === Heir.BlackPanther ? Heir.WhiteTiger : Heir.BlackPanther
    const hyenasInDeck = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).id(isHyena).player(opponent)
    if (cards.filter((item) => isHyena(item.id)).length && hyenasInDeck.length) {
      this.memorize(Memory.HyenaInTricks, 1)
      moves.push(
        ...hyenasInDeck.moveItems({ type: LocationType.PlayerTrickStack, player: opponent, rotation: true }),
        ...this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(winner).moveItems({
          type: LocationType.PlayerTrickStack,
          player: winner,
          rotation: true
        })
      )
    }

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
    const hyenasInTrick = this.material(MaterialType.AnimalCard).location(LocationType.PlayerTrickStack).id(isHyena).player(opponent)
    const hyenasInDeck = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).id(isHyena).player(opponent)
    const moves: MaterialMove[] = []

    if (isHyena(item.id) && !hyenasInDeck.length && !hyenasInTrick.length && !this.hyenaInTrick) {
      moves.push(
        ...card.moveItems({
          type: LocationType.PlayerHyena,
          player: winner
        })
      )
    } else {
      moves.push(
        ...card.moveItems({
          type: LocationType.PlayerTrickStack,
          player: winner
        })
      )
    }

    return moves
  }

  get hyenaInTrick() {
    return this.remind(Memory.HyenaInTricks) === 1
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
    this.forget(Memory.EaglePlayer)
    return []
  }

  get lead() {
    return this.remind(Memory.Lead)
  }

}
