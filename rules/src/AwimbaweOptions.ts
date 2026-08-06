import { TFunction, OptionsSpecV2 } from '@gamepark/rules-api'
import Heir, { heirs } from './material/Heir'

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
 * The option space of awimbawe: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const AwimbaweOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 2 },
  identities: { values: heirs }
}

export function getPlayerName(playerId: Heir, t: TFunction) {
  return t(`player.${playerId}`)
}
