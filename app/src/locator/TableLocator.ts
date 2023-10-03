import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";
import { animalCardDescription } from "../material/AnimalCardDescription";

export class TableLocator extends LineLocator {

    getDelta(item: MaterialItem, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        if (item.location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2, z: 0 }
        }


        return { x: 0, y: -2, z: 0 }
    }

    getCoordinates(item: MaterialItem, { rules, player }: ItemContext): Coordinates {
        if (item.location.player === (player ?? rules.players[0])) {
            return {
                x: 15 + (item.location.id - 1) * (animalCardDescription.width + 1),
                y: 20,
                z: 0
            }
        }

        return {
            x: 37 - (item.location.id - 1) * (animalCardDescription.width + 1),
            y: -15,
            z: 0
        }
    }

    isHidden(item: MaterialItem) {
        return item.rotation?.y === 1
    }

    getRotation(item: MaterialItem, { player, rules }: ItemContext): number {
        return item.location.player === (player ?? rules.players[0]) ? 0 : -180
    }

}

export const tableLocator = new TableLocator()