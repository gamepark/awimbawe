/** @jsxImportSource @emotion/react */
import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerTrickStackLocator extends PileLocator {
  maxAngle = 10
  limit = 60

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: -29, y: location.player === player ? 17 : -17 }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const playerTrickStackLocator = new PlayerTrickStackLocator()
