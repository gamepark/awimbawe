/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { DropAreaDescription, ItemContext, ListLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { animalCardDescription } from '../material/AnimalCardDescription'

class PlayAreaLocator extends ListLocator {
  locationDescription = new DropAreaDescription({ width: 27, height: 18, borderRadius: 2 })
  location = { type: LocationType.PlayArea }
  gap = { x: animalCardDescription.width + 1 }
  maxCount = 2
  coordinates = { x: -10.55 }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const player = context.player ?? context.rules.players[0]
    const { x, y = 0, z } = super.getItemCoordinates(item, context)
    return { x, y: item.location.player === player ? y + 2 : y - 2, z }
  }
}

export const playAreaLocator = new PlayAreaLocator()
