/** @jsxImportSource @emotion/react */
import { LineLocator } from '@gamepark/react-game'
import { animalCardDescription } from '../material/AnimalCardDescription'
import { PlayerAreaDescription } from './description/PlayAreaDescription'

export class PlayerAreaLocator extends LineLocator {
    locationDescription = new PlayerAreaDescription()
    delta = { x: animalCardDescription.width + 1, y: 0, z: 0}
    coordinates = { 
        x: this.locationDescription.coordinates.x - ((animalCardDescription.width + 1) / 2), 
        y: this.locationDescription.coordinates.y, 
        z: 1
    }
}

export const playerAreaLocator = new PlayerAreaLocator()
