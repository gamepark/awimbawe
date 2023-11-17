import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -10, y: 20, z: 0 }
    }

    return { x: -10, y: -15, z: 0 }
  }

  isHidden(item: MaterialItem, context: ItemContext) {
    const player = context.player
    if (!player || item.location.player !== player) return true;
    return false
  }

  getBaseAngle(item: MaterialItem, { player, rules }: ItemContext): number {
    const baseRotation = item.location.player === (player ?? rules.players[0]) ? 0 : -180
    const zRotation = item.rotation?.z === 1? 90: 0
    return baseRotation + zRotation
  }
}

export const playerHandLocator = new PlayerHandLocator()