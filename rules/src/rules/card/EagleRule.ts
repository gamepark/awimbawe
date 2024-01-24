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
        this.memorize(Memory.Eagle, move.data)
        this.memorize(Memory.EaglePlayer, this.player)
        return this.afterEffectPlayed()
    }
}