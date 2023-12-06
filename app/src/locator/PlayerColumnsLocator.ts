import { ItemContext, LineLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";
import { animalCardDescription } from "../material/AnimalCardDescription";
import { PlayerColumnsDescription } from "./description/PlayerColumnsDescription";
import { MaterialType } from "@gamepark/awimbawe/material/MaterialType";

export class PlayerColumnsLocator extends LineLocator {

    locationDescription = new PlayerColumnsDescription()

    getDelta(item: MaterialItem, { rules, player }: ItemContext<number, number, number>): Partial<Coordinates> {
        const selected = !!item.selected? 1: 0
        if (item.location.player === (player ?? rules.players[0])) {
            return { x: 0, y: 2 - selected, z: 0.05 }
        }


        return { x: 0, y: -2 - selected, z: 0.05 }
    }

    getCoordinates(item: MaterialItem, { rules, player }: ItemContext): Coordinates {
        const count = rules
            .material(MaterialType.AnimalCard)
            .location(item.location.type)
            .locationId(item.location.id)
            .player(item.location.player).length
        if (item.location.player === (player ?? rules.players[0])) {
            return {
                x: 15 + (item.location.id - 1) * (animalCardDescription.width + 1.5),
                y: 15 -  Math.max((count - 2), 0) * 2,
                z: 0
            }
        }

        return {
            x: 38.7 - (item.location.id - 1) * (animalCardDescription.width + 1.5),
            y: -15 + Math.max((count - 2), 0) * 2,
            z: 0
        }
    }

    getRotateZ(item: MaterialItem<number, number>, { rules, player }: ItemContext<number, number, number>): number {
        const baseRotation = item.location.player === (player ?? rules.players[0]) ? 0 : -180
        const zRotation = item.location.rotation?.z === 1? 90: 0
        return baseRotation + zRotation
    }

}

export const playerColumnsLocator = new PlayerColumnsLocator()
