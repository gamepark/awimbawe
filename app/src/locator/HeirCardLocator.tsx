import { ItemContext, ItemLocator } from "@gamepark/react-game";
import { MaterialItem, Coordinates } from "@gamepark/rules-api";

export class HeirCardLocator extends ItemLocator {
    getPosition(item: MaterialItem, { rules, player }: ItemContext): Coordinates {
        if (item.id === (player ?? rules.players[0])) {
            return { x: 51, y: 11, z: 0}    
        }

        return { x: 51, y: -7, z: 0}
    }

    isHidden(item: MaterialItem) {
        return item.rotation?.y === 1
    }
}

export const heirCardLocator = new HeirCardLocator()