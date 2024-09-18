import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class HeirCardLocator extends Locator {
  getItemCoordinates(item: MaterialItem, { rules, player = rules.players[0] }: ItemContext) {
    return { x: 51, y: item.id === player ? 14 : -14 }
  }

  getItemRotateZ(item: MaterialItem, { rules, player = rules.players[0] }: ItemContext) {
    return item.id === player ? 0 : 180
  }
}

export const heirCardLocator = new HeirCardLocator()
