/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from "@gamepark/react-game";
import { MaterialItem } from "@gamepark/rules-api";

export class PlayerTrickStack extends ItemLocator {
    maxAngle = 10
    delta = { x: 0.05, y: 0.05, z: 0.05}
    
  getPosition(item: MaterialItem, context: ItemContext) {
    const { rules, player, material, type } = context
    const z = material[type].getThickness(item, context) * (item.location.x! + 1)
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -35, y: 21, z }
    }

    return { x: -35, y: -15, z }
  }

  getRotation(item: MaterialItem, { rules, player }: ItemContext) {
    return item.location.player === (player ?? rules.players[0]) ? 0 : -180
  }
}

export const playerTrickStack = new PlayerTrickStack()
