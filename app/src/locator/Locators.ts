import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { DeckLocator, Locator } from '@gamepark/react-game'
import { heirCardLocator } from './HeirCardLocator'
import { playAreaLocator } from './PlayAreaLocator'
import { playerColumnsLocator } from './PlayerColumnsLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerHyenaLocator } from './PlayerHyenaLocator'
import { playerTrickStackLocator } from './PlayerTrickStackLocator'

export const Locators: Record<LocationType, Locator> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.PlayerColumns]: playerColumnsLocator,
  [LocationType.PlayArea]: playAreaLocator,
  [LocationType.PlayerTrickStack]: playerTrickStackLocator,
  [LocationType.HeirCard]: heirCardLocator,
  [LocationType.Deck]: new DeckLocator(),
  [LocationType.PlayerHyena]: playerHyenaLocator,
  [LocationType.HelpCard]: new Locator({ coordinates: { x: 51 } })
}
