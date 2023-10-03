import { MaterialItem, hideItemIdToOthers } from "@gamepark/rules-api";
import { LocationType } from "../material/LocationType";
import { MaterialType } from "../material/MaterialType";

export const hidingStrategies = {
    [MaterialType.AnimalCard]: {
        [LocationType.Hand]: hideItemIdToOthers,
        [LocationType.Table]: (item: MaterialItem) => item.rotation?.y === 1? ['id']: []
    }
}