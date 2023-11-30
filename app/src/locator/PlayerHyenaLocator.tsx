/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem } from "@gamepark/rules-api";

export class PlayerHyenaLocator extends LineLocator {

  getDelta(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    if (item.location.player === (player ?? rules.players[0])) {
      return { y: -2, z: -0.05 }
    }

    return { y: 2, z: -0.05 }
  }
    
  getCoordinates(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -29, y: 7, z: 1 }
    }

    return { x: -29, y: -7, z: 1 }
  }

  getRotateZ(item: MaterialItem, { rules, player }: ItemContext) {
    return item.location.player === (player ?? rules.players[0]) ? 0 : -180
  }
}

export const playerHyenaLocator = new PlayerHyenaLocator()
