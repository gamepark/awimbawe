import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import Heir from '@gamepark/awimbawe/Heir'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { playerHandLocator } from './PlayerHandLocator'
import { tableLocator } from './TableLocator'
import { playerAreaLocator } from './PlayAreaLocator'
import { playerTrickStack } from './PlayerTrickStack'

export const Locators: Record<LocationType, ItemLocator<Heir, MaterialType, LocationType>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.Table]: tableLocator,
  [LocationType.PlayArea]: playerAreaLocator,
  [LocationType.PlayerTrickStack]: playerTrickStack
}
