/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { LocationDescription } from '@gamepark/react-game'
import { animalCardDescription } from '../../material/AnimalCardDescription'

export class PlayerAreaDescription extends LocationDescription {
    location = { type: LocationType.PlayArea }
    width = (animalCardDescription.width * 2) + 15
    height = animalCardDescription.height + 10
    borderRadius = animalCardDescription.borderRadius + 1
    coordinates = { x: -6.9, y: 0, z: 0.1 }

}
