import {  CompetitiveRank, MaterialGame, MaterialMove, SecretMaterialRules } from '@gamepark/rules-api'
import Heir from './material/Heir'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { rules } from './configuration/RuleDefinitions'
import { hidingStrategies } from './configuration/HidingStrategies'
import { locationsStrategies } from './configuration/LocationStrategies'
import sumBy from 'lodash/sumBy'
import { getCrowns } from './material/Animal'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class AwimbaweRules extends SecretMaterialRules<Heir, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<Heir, MaterialType, LocationType>, MaterialMove<Heir, MaterialType, LocationType>, Heir>  {
  rules = rules
  hidingStrategies = hidingStrategies
  locationsStrategies = locationsStrategies

  rankPlayers(playerA: Heir, playerB: Heir) {
    const crownsPlayerA = this.getPlayerCrowns(playerA)
    const crownsPlayerB = this.getPlayerCrowns(playerB)
    const heirCardA = this.material(MaterialType.HeirCard).id(playerA).getItem()
    const hyenasPlayerA = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(playerA).length
    const hyenasPlayerB = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(playerB).length
    console.log(playerA, hyenasPlayerA, crownsPlayerA, heirCardA)
    console.log(playerB, hyenasPlayerB, crownsPlayerB)
    
    if (hyenasPlayerB === 4) return -1
    if (hyenasPlayerA === 4) return 1
    if (crownsPlayerA > crownsPlayerB && heirCardA?.rotation?.y === 1) {
      return -1
    }

    console.log(playerA, playerB, 1)
    return 1
  }

  getPlayerCrowns(player: Heir) {
    const cards = this
      .material(MaterialType.AnimalCard)
      .player(player)
      .getItems()


    return sumBy(cards, (card) => getCrowns(card.id))
  }
}