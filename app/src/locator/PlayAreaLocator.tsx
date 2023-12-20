/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { PlayerAreaDescription } from './description/PlayAreaDescription'

export class PlayAreaLocator extends LineLocator {
    locationDescription = new PlayerAreaDescription()
    delta = { x: animalCardDescription.width + 1, y: 0, z: 0}

  getCoordinates(item: MaterialItem, { rules, player }: ItemContext): Coordinates {
      return {
        x: this.locationDescription.coordinates.x - ((animalCardDescription.width + 1) / 2),
        y: this.locationDescription.coordinates.y + (item.location.player === (player ?? rules.players[0])? 2: -2),
        z: 1
      }
  }
}

export const playAreaLocator = new PlayAreaLocator()
