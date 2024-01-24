import { isShuffleItemType, Location, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { START_HAND } from '../AwimbaweSetup'
import { getCrowns } from '../material/Animal'
import Heir from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory, RoundSummary, WinType } from './Memory'
import { RuleId } from './RuleId'

export class PrepareNewRoundRule extends MaterialRulesPart {
  onRuleStart() {
    const winner = this.computeWinner()
    return this.afterWinnerComputed(winner)
  }

  afterWinnerComputed(winner: Heir) {
    this.memorize(Memory.Winner, winner)
    const roundWinnerCard = this
      .material(MaterialType.HeirCard)
      .id(winner)

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
    const looser = this.game.players.find((p) => p !== winner)!
    moves.push(this.rules().startPlayerTurn(RuleId.ChoosePlayer, looser))
    return moves
  }


  afterItemMove(move: MoveItem) {
    if (isShuffleItemType(MaterialType.AnimalCard)(move)) {
      return this.fillHandAndColumnMoves
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
    this.forget(Memory.HyenaInTricks)
    return []
  }


  computeWinner() {

    const pantherCrowns = this.getPlayerCrowns(Heir.BlackPanther)
    const tigerCrowns = this.getPlayerCrowns(Heir.WhiteTiger)

    if (this.hasFourHyenas(Heir.BlackPanther)) {
      this.saveRoundSummary(Heir.WhiteTiger, WinType.Hyena)
      return Heir.WhiteTiger
    }

    if (this.hasFourHyenas(Heir.WhiteTiger)) {
      this.saveRoundSummary(Heir.BlackPanther, WinType.Hyena)
      return Heir.BlackPanther
    }

    if (pantherCrowns < tigerCrowns) {
      this.saveRoundSummary(Heir.WhiteTiger, WinType.Crowns, pantherCrowns, tigerCrowns)
      return Heir.WhiteTiger
    } else {
      this.saveRoundSummary(Heir.BlackPanther, WinType.Crowns, pantherCrowns, tigerCrowns)
      return Heir.BlackPanther
    }
  }

  saveRoundSummary(winner: Heir, type: WinType, pantherCrowns?: number, tigerCrowns? : number) {
    this.memorize<RoundSummary[]>(Memory.RoundSummary, (s = []) => {
      const summaries = [...s]
      const summary: RoundSummary = {
        type,
        winner
      }

      if (type === WinType.Crowns) {
        summary.crowns = {
          [Heir.BlackPanther]: pantherCrowns!,
          [Heir.WhiteTiger]: tigerCrowns!
        }
      }


      summaries.push(summary)
      return summaries
    })
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
