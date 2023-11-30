import { MaterialItem, hideItemId, hideItemIdToOthers } from "@gamepark/rules-api";
import { LocationType } from "../material/LocationType";
import { MaterialType } from "../material/MaterialType";

export const hidingStrategies = {
    [MaterialType.AnimalCard]: {
        [LocationType.Hand]: hideItemIdToOthers,
        [LocationType.PlayerColumns]: (item: MaterialItem) => item.location?.rotation?.y === 1? ['id']: [],
        [LocationType.Deck]: hideItemId
    }
}
