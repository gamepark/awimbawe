import { ItemMove, MaterialMove } from '@gamepark/rules-api'
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

  afterItemMove(_move: ItemMove) {
    return this.afterEffectPlayed()
  }
}
