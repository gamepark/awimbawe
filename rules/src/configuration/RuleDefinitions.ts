import { MaterialRulesPartCreator } from "@gamepark/rules-api"
import { RuleId } from '../rules/RuleId'
import { ChooseCardRule } from '../rules/ChooseCardRule'
import { SolveTrickRule } from "../rules/SolveTrickRule"
import { EndOfTurnRule } from "../rules/EndOfTurnRule"
import { PrepareNewRound } from "../rules/PrepareNewRound"
import { ChooseStartPlayerRule } from "../rules/ChooseStartPlayerRule"
import { SnakeRule } from "../rules/card/SnakeRule"
import { RhinocerosRule } from "../rules/card/RhinocerosRule"
import { CheetahRule } from "../rules/card/CheetahRule"
import { EagleRule } from "../rules/card/EagleRule"

export const rules: Record<RuleId, MaterialRulesPartCreator> = {
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