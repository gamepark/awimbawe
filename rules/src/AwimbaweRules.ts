import {
  CompetitiveRank,
  hideItemId,
  hideItemIdToOthers,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
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
import { PrepareNewRoundRule } from './rules/PrepareNewRoundRule'
import { RuleId } from './rules/RuleId'
import { SolveTrickRule } from './rules/SolveTrickRule'


export const hideIdWhenRotated: HidingStrategy = (
  item: MaterialItem
) => {
  return !item.location.rotation ? [] : ['id']
}

export class AwimbaweRules extends SecretMaterialRules<Heir, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<Heir, MaterialType, LocationType>, MaterialMove<Heir, MaterialType, LocationType>, Heir>,
    TimeLimit<MaterialGame<Heir, MaterialType, LocationType>, MaterialMove<Heir, MaterialType, LocationType>, Heir> {
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
    [RuleId.PrepareNewRound]: PrepareNewRoundRule,
    [RuleId.ChoosePlayer]: ChooseStartPlayerRule,
    [RuleId.Rhinoceros]: RhinocerosRule,
    [RuleId.Snake]: SnakeRule,
    [RuleId.Cheetah]: CheetahRule,
    [RuleId.Eagle]: EagleRule
  }

  hidingStrategies = {
    [MaterialType.AnimalCard]: {
      [LocationType.Hand]: hideItemIdToOthers,
      [LocationType.PlayerColumns]: (item: MaterialItem) => item.location?.rotation?.y === 1 ? ['id'] : [],
      [LocationType.Deck]: hideItemId,
      [LocationType.PlayerTrickStack]: hideIdWhenRotated
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

  giveTime(): number {
    return 30
  }
}
