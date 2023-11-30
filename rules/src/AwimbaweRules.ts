import {
  CompetitiveRank,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules
} from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { getCrowns } from './material/Animal'
import Heir from './material/Heir'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { CheetahRule } from './rules/card/CheetahRule'
import { EagleRule } from './rules/card/EagleRule'
import { RhinocerosRule } from './rules/card/RhinocerosRule'
import { SnakeRule } from './rules/card/SnakeRule'
import { ChooseCardRule } from './rules/ChooseCardRule'
import { ChooseStartPlayerRule } from './rules/ChooseStartPlayerRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { PrepareNewRound } from './rules/PrepareNewRound'
import { RuleId } from './rules/RuleId'
import { SolveTrickRule } from './rules/SolveTrickRule'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class AwimbaweRules extends SecretMaterialRules<Heir, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<Heir, MaterialType, LocationType>, MaterialMove<Heir, MaterialType, LocationType>, Heir>  {
  rankPlayers(playerA: Heir, playerB: Heir) {
    const crownsPlayerA = this.getPlayerCrowns(playerA)
    const crownsPlayerB = this.getPlayerCrowns(playerB)
    const heirCardA = this.material(MaterialType.HeirCard).id(playerA).getItem()
    const hyenasPlayerA = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(playerA).length
    const hyenasPlayerB = this.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(playerB).length
    
    if (hyenasPlayerB === 4) return -1
    if (hyenasPlayerA === 4) return 1
    if (crownsPlayerA > crownsPlayerB && heirCardA?.location?.rotation) {
      return -1
    }

    return 1
  }

  getPlayerCrowns(player: Heir) {
    const cards = this
      .material(MaterialType.AnimalCard)
      .player(player)
      .getItems()


    return sumBy(cards, (card) => getCrowns(card.id))
  }

  rules = {
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.SolveTrick]: SolveTrickRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.PrepareNewRound]: PrepareNewRound,
    [RuleId.ChoosePlayer]: ChooseStartPlayerRule,
    [RuleId.Rhinoceros]: RhinocerosRule,
    [RuleId.Snake]: SnakeRule,
    [RuleId.Cheetah]: CheetahRule,
    [RuleId.Eagle]: EagleRule
  }

  hidingStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.Hand]: hideItemIdToOthers,
      [LocationType.PlayerColumns]: (item: MaterialItem) => item.location?.rotation?.y === 1? ['id']: [],
      [LocationType.Deck]: hideItemId
    }
  }

  locationsStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.PlayerColumns]: new PositiveSequenceStrategy(),
      [LocationType.PlayerTrickStack]: new PositiveSequenceStrategy(),
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHyena]: new PositiveSequenceStrategy()
    }
  }
}
