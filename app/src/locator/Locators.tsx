import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { playerHandLocator } from './PlayerHandLocator'
import { playerColumnsLocator } from './PlayerColumnsLocator'
import { playAreaLocator } from './PlayAreaLocator'
import { playerTrickStack } from './PlayerTrickStack'
import { heirCardLocator } from './HeirCardLocator'
import Heir from '@gamepark/awimbawe/material/Heir'
import { gameDeckLocator } from './GameDeckLocator'
import { playerHyenaLocator } from './PlayerHyenaLocator'
import {helpCardLocator} from "./HelpCardLocator";

export const Locators: Record<LocationType, ItemLocator<Heir, MaterialType, LocationType>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.PlayerColumns]: playerColumnsLocator,
  [LocationType.PlayArea]: playAreaLocator,
  [LocationType.PlayerTrickStack]: playerTrickStack,
  [LocationType.HeirCard]: heirCardLocator,
  [LocationType.Deck]: gameDeckLocator,
  [LocationType.PlayerHyena]: playerHyenaLocator,
  [LocationType.HelpCard]: helpCardLocator
}
