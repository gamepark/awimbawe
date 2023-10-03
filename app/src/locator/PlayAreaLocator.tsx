/** @jsxImportSource @emotion/react */
import { LineLocator } from "@gamepark/react-game";
import { animalCardDescription } from "../material/AnimalCardDescription";
import { PlayerAreaDescription } from "./description/PlayAreaDescription";
import { MaterialItem } from "@gamepark/rules-api";

export class PlayerAreaLocator extends LineLocator {
    locationDescription = new PlayerAreaDescription()
    delta = { x: animalCardDescription.width + 1, y: 0, z: 0}
    coordinates = { 
        x: this.locationDescription.coordinates.x - ((animalCardDescription.width + 1) / 2), 
        y: this.locationDescription.coordinates.y, 
        z: 0
    }

    getPileId(item: MaterialItem) {
        return `${item.location.x!}`  
    }
}

export const playerAreaLocator = new PlayerAreaLocator()
