import { MaterialRulesPartCreator } from "@gamepark/rules-api"
import { RuleId } from '../rules/RuleId'
import { ChooseCardRule } from '../rules/ChooseCardRule'
import { SolveTrickRule } from "../rules/SolveTrickRule"
import { EndOfTurnRule } from "../rules/EndOfTurnRule"

export const rules: Record<RuleId, MaterialRulesPartCreator> = {
    [RuleId.ChooseCard]: ChooseCardRule,
    [RuleId.SolveTrick]: SolveTrickRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
}