import { HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: -7, y: location.player === player ? 15 : -15, z: 0 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.location.rotation?.z === 1) {
      transforms.push('rotateZ(90deg)')
    }
    return transforms
  }

  getBaseAngle(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
