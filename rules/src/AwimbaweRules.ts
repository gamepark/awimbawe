import { SecretMaterialRules } from '@gamepark/rules-api'
import Heir from './material/Heir'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { rules } from './configuration/RuleDefinitions'
import { hidingStrategies } from './configuration/HidingStrategies'
import { locationsStrategies } from './configuration/LocationStrategies'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class AwimbaweRules extends SecretMaterialRules<Heir, MaterialType, LocationType> {
  rules = rules
  hidingStrategies = hidingStrategies
  locationsStrategies = locationsStrategies
}