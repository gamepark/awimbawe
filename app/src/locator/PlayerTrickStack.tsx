/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerTrickStack extends PileLocator {
  maxAngle = 10
  limit = 60
    
  getCoordinates(item: MaterialItem, context: ItemContext) {
    const { rules, player, material, type } = context
    const z = material[type]!.getThickness(item, context) * (item.location.x! + 1)
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -29, y: 17, z }
    }

    return { x: -29, y: -17, z }
  }

  getRotateZ(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    const baseZ = item.location.player === (player ?? rules.players[0]) ? 0 : -180
    return super.getRotateZ(item, context) + baseZ
  }
}

export const playerTrickStack = new PlayerTrickStack()
