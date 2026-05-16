import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export abstract class CardRule extends PlayerTurnRule {
  afterEffectPlayed(): MaterialMove[] {
    const player = this.player
    if (player !== this.lead) {
      return [this.startRule(RuleId.SolveTrick)]
    }

    return [this.startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
  }

  get lead() {
    return this.remind(Memory.Lead)
  }
}
