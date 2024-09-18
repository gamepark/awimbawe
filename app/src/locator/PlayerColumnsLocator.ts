import { css } from '@emotion/react'
import { DropAreaDescription, ListLocator, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'

class PlayerColumnsLocator extends ListLocator {
  locationDescription = new PlayerColumnsDescription()

  getGap = (location: Location, { rules, player = rules.players[0] }: MaterialContext) => ({ y: location.player === player ? 2 : -2 })
  maxCount = 3

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return {
      x: 15 + (location.id - 1) * (animalCardDescription.width + 1.5),
      y: location.player === player ? 15 : -15
    }
  }

  placeLocation(location: Location, context: LocationContext) {
    const { x = 0, y = 0, z = 0 } = this.getLocationCoordinates(location, context)
    return [`translate3d(${x}em, ${y + 6}em, ${z}em)`]
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    const baseRotation = location.player === player ? 0 : 180
    const zRotation = location.rotation?.z === 1 ? 90 : 0
    return baseRotation + zRotation
  }
}

class PlayerColumnsDescription extends DropAreaDescription {
  width = 6.3
  height = 6.3
  borderRadius = 0.4
  extraCss = css`
    &:before {
      position: absolute;
      content: "↑";
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 3em;
      font-weight: bold;
    }
  `
}

export const playerColumnsLocator = new PlayerColumnsLocator()
