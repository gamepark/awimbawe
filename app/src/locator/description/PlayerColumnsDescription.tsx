import { otherHeir } from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { animalCardDescription } from '../../material/AnimalCardDescription'

export class PlayerColumnsDescription extends LocationDescription {
  alwaysVisible = true
  width = animalCardDescription.width
  ratio = animalCardDescription.ratio

  getLocations(context: MaterialContext): Location[] {
    const { player } = context
    if (!player) return []
    const opponent = otherHeir(player)
    const locations = []
    for (let i = 1; i <= 4; i++) {
      locations.push({
        type: LocationType.PlayerColumns,
        id: i,
        player: opponent,
        x: 0
      })
    }
    return locations
  }

  getCoordinates(location: Location, _context: MaterialContext) {
    return {
      x: 38.7 - (location.id - 1) * (animalCardDescription.width + 1.5),
      y: -7,
      z: -1
    }
  }
}
