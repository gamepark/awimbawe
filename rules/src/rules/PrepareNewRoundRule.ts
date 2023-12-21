import { isShuffleItemType, Location, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import sample from 'lodash/sample'
import { START_HAND } from '../AwimbaweSetup'
import { getCrowns } from '../material/Animal'
import Heir, { heirs } from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareNewRoundRule extends MaterialRulesPart {
  onRuleStart() {
    this.memorize(Memory.Winner, this.winner)
    const roundWinnerCard = this
      .material(MaterialType.HeirCard)
      .id(this.winner)

    if (roundWinnerCard.getItem()?.location?.rotation) {
      return [this.rules().endGame()]
    }

    const moves: MaterialMove[] = roundWinnerCard.rotateItems(true)


    moves.push(
      this
        .material(MaterialType.AnimalCard)
        .moveItemsAtOnce({ type: LocationType.Deck })
    )

    moves.push(this.material(MaterialType.AnimalCard).shuffle())
    return moves
  }

  afterItemMove(move: MoveItem) {
    if (isShuffleItemType(MaterialType.AnimalCard)(move)) {
      const moves = this.fillHandAndColumnMoves
      const looser = this.game.players.find((p) => p !== this.winner)!
      moves.push(this.rules().startPlayerTurn(RuleId.ChoosePlayer, looser))
      return moves
    }

    return []
  }

  get fillHandAndColumnMoves() {
    const moves: MaterialMove[] = []
    const cards = this.material(MaterialType.AnimalCard).sort((item) => -item.location.x!)
    const deck = cards.deck()
    for (const player of this.game.players) {
      moves.push(...deck.deal({ type: LocationType.Hand, player }, START_HAND))
      for (let i = 0; i < 8; i++) {
        const column = (i % 4) + 1
        const location: Location = { type: LocationType.PlayerColumns, player, id: column }
        if (i < 4) {
          location.rotation = { y: 1 }
        }
        moves.push(deck.dealOne(location))
      }

    }

    return moves
  }

  onRuleEnd() {
    this.forget(Memory.Winner)
    return []
  }


  get winner() {
    if (this.hasFourHyenas(Heir.BlackPanther)) {
      return Heir.WhiteTiger
    }

    if (this.hasFourHyenas(Heir.WhiteTiger)) {
      return Heir.BlackPanther
    }

    const pantherCrowns  = this.getPlayerCrowns(Heir.BlackPanther)
    const tigerCrowns  = this.getPlayerCrowns(Heir.WhiteTiger)

    let lead = undefined
    if (pantherCrowns === tigerCrowns) {
      lead = sample(heirs)
    } else if (pantherCrowns < tigerCrowns) {
      lead = Heir.WhiteTiger
    } else {
      lead = Heir.BlackPanther
    }

    return lead
  }

  hasFourHyenas(player: Heir) {
    const hyenas = this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHyena)
      .player(player)
      .length

    if (hyenas === 4) {
      return true
    }

    return false
  }

  getPlayerCrowns(player: Heir) {
    // Rechercher les MaterialType.AnimalCard dans LocationType.PlayerColumns
    const items = this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerTrickStack)
      .player(player)
      .getItems()

    // Parcourir les cartes, et pour chaque animal, additionner les couronnes
    let count = 0
    for (const item of items) {
      count = count + getCrowns(item.id)
    }

    return count
  }
}
