import { isMoveItemType, ItemMove, Material, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CardRule } from './CardRule'

export class RhinocerosRule extends CardRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = this.afterEffectPlayed()

    for (let column = 1; column <= 4; column++) {
      const columnCard = this
        .material(MaterialType.AnimalCard)
        .location(LocationType.PlayerColumns)
        .locationId(column)
        .player((p) => this.player !== p)

      const topCard = columnCard.maxBy((item) => item.location.x!)


      if (topCard.length) {
        const item = topCard.getItem()!
        for (let newColumn = 1; newColumn <= 4; newColumn++) {
          if (newColumn === column && columnCard.length === 1) continue

          moves.push(
            topCard.moveItem(item.location.rotation ? {
              type: LocationType.PlayerColumns,
              id: newColumn,
              player: item.location.player,
              x: 0,
              rotation: item.location.rotation
            } : {
              type: LocationType.PlayerColumns,
              id: newColumn,
              player: item.location.player,
              x: 0
            })
          )
        }
      }
    }

    return moves
  }

  allCardsInSameColumn = (opponentCards: Material): boolean => {
    const item = opponentCards.getItem()!
    if (item.location?.type !== LocationType.PlayerColumns) return false
    const column = item.location?.id
    const cardInSameColumn = opponentCards.filter((item) => LocationType.PlayerColumns === item.location?.type && item.location?.id === column)
    return opponentCards.length === cardInSameColumn.length
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.AnimalCard)(move) && move.location?.type === LocationType.PlayerColumns && move.location?.x === 0) {
      const opponentCards = this
        .material(MaterialType.AnimalCard)
        .location(LocationType.PlayerColumns)
        .player((p) => this.player !== p)

      if (this.allCardsInSameColumn(opponentCards)) {
        const topCard = opponentCards.maxBy((item) => item.location.x!)
        if (topCard.getItem()?.location?.rotation?.y === 1) {
          moves.push(topCard.rotateItem({}))
        }
      }

      moves.push(...this.afterEffectPlayed())
    }

    return moves
  }
}
