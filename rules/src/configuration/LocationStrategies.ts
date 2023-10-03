import { LocationType } from '../material/LocationType'
import { LocationStrategy, PositiveSequenceStrategy } from '@gamepark/rules-api'
import Heir from '../Heir'
import { MaterialType } from '../material/MaterialType'

export const locationsStrategies:  Partial<Record<MaterialType, Partial<Record<LocationType, LocationStrategy<Heir, MaterialType, LocationType>>>>> = {
    [MaterialType.AnimalCard]: {
        [LocationType.Hand]: new PositiveSequenceStrategy(),
        [LocationType.Table]: new PositiveSequenceStrategy(),
        [LocationType.PlayerTrickStack]: new PositiveSequenceStrategy()
    }
}
