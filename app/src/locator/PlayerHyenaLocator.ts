/** @jsxImportSource @emotion/react */
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerHyenaLocator extends ListLocator {

  getGap(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { y: location.player === player ? -2 : 2 }
  }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: -29, y: location.player === player ? 7 : -7 }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : -180
  }
}

export const playerHyenaLocator = new PlayerHyenaLocator()
