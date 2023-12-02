import {OptionsSpec} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import Heir, {heirs} from './material/Heir'

/**
 * This is the options for each players in the game.
 */
type AwimbawePlayerOptions = { id: Heir }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type AwimbaweOptions = {
  players: AwimbawePlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const AwimbaweOptionsSpec: OptionsSpec<AwimbaweOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Heir'),
      values: heirs,
      valueSpec: color => ({label: t => getPlayerName(color, t)})
    }
  }
}

export function getPlayerName(playerId: Heir, t: TFunction) {
  return t(`player.${playerId}`)
}
