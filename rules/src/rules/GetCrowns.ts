import AwimbaweRules from "../AwimbaweRules"
import sumBy from 'lodash/sumBy'
import { RuleId } from "./RuleId"
import Heir from "../material/Heir"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { getCrowns } from "../material/Animal"

export const getPlayerCrowns = (rules: AwimbaweRules, player: Heir) => {
    if (rules.game.rule?.id === RuleId.PrepareNewRound) return 0
    const cards = rules
        .material(MaterialType.AnimalCard)
        .location(LocationType.PlayerTrickStack)
        .player(player)
        .getItems()

    return sumBy(cards, (card) => getCrowns(card.id))
}