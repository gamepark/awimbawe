import { sumBy } from 'es-toolkit'
import { AwimbaweRules } from '../AwimbaweRules'
import { getCrowns } from '../material/Animal'
import Heir from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export const getTotalCrowns = (rules: AwimbaweRules, player: Heir) => {
  if (rules.game.rule?.id === RuleId.PrepareNewRound) return 0
  const cards = rules.material(MaterialType.AnimalCard).location(LocationType.PlayerTrickStack).player(player).getItems()

  return sumBy(cards, (card) => getCrowns(card.id))
}

export const getPlayerCrowns = (rules: AwimbaweRules, player: Heir) => {
  if (rules.game.rule?.id === RuleId.PrepareNewRound) return 0
  return getTotalCrowns(rules, player)
}
