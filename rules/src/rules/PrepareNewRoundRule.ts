import { isShuffleItemType, Location, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { START_HAND } from '../AwimbaweSetup'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PrepareNewRoundRule extends MaterialRulesPart {
  onRuleStart() {
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

  get winner() {
    return this.remind(Memory.Winner)
  }

  onRuleEnd() {
    this.forget(Memory.Winner)
    return []
  }
}
