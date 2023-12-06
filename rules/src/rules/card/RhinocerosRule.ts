import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { CardRule } from './CardRule'
import { isSelectItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'

export class RhinocerosRule extends CardRule {
  getPlayerMoves() {
    const moves: MaterialMove[] = []

    const allColumnCards = this.material(MaterialType.AnimalCard).player((p) => this.player !== p).location(LocationType.PlayerColumns)
    const selected = allColumnCards.selected(true)
    if (selected.length) {
      const item = selected.getItem()!
      for (let newColumn = 1; newColumn <= 4; newColumn++) {
        moves.push(
          selected.moveItem(item.location.rotation ? {
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

      return moves
    }

    for (let column = 1; column <= 4; column++) {
      const columnCard = this
        .material(MaterialType.AnimalCard)
        .location(LocationType.PlayerColumns)
        .locationId(column)
        .player((p) => this.player !== p)

      const selected = columnCard.selected(true)
      if (!selected.length && columnCard.length > 1) {
        const topCard = columnCard.maxBy((item) => item.location.x!)
        moves.push(topCard.selectItem())
      }
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.AnimalCard)(move)) return []
    return this.afterEffectPlayed()
  }
}
