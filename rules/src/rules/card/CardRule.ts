import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { RuleId } from "../RuleId"
import { Memory } from "../Memory"


export abstract class CardRule extends PlayerTurnRule {

    afterEffectPlayed(): MaterialMove[] {
        const player = this.player
        if (player !== this.lead) {
            return [this.rules().startRule(RuleId.SolveTrick)]
        }

        return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
    }

    get lead() {
        return this.remind(Memory.Lead)
    }
}