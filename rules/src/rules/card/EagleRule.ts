import { CustomMove } from "@gamepark/rules-api"
import { CustomMoveType, EagleChoice } from "../CustomMoveType"
import { CardRule } from "./CardRule"
import { Memory } from "../Memory"

export class EagleRule extends CardRule {
    getPlayerMoves() {
        return [
            this.rules().customMove(CustomMoveType.EagleChoice, EagleChoice.Runaway),
            this.rules().customMove(CustomMoveType.EagleChoice, EagleChoice.Attack)
        ]
    }

    onCustomMove(move: CustomMove) {
        if (EagleChoice.Runaway === move.data) {
            this.memorize(Memory.Eagle, move.data)
        }

        return this.afterEffectPlayed()
    }
}