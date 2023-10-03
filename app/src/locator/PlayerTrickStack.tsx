/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from "@gamepark/react-game";
import { MaterialItem } from "@gamepark/rules-api";

export class PlayerTrickStack extends PileLocator {
    maxAngle = 10
    delta = { x: 0.05, y: 0.05, z: 0.05}
    
  getCoordinates(item: MaterialItem, context: ItemContext) {
    const { rules, player, material, type } = context
    const z = material[type].getThickness(item, context) * (item.location.x! + 1)
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -35, y: 21, z }
    }

    return { x: -35, y: -15, z }
  }
}

export const playerTrickStack = new PlayerTrickStack()
