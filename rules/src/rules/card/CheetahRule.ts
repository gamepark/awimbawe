import { CustomMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { CardRule } from './CardRule'
import Heir from '../../material/Heir'

export class CheetahRule extends CardRule {
    getPlayerMoves() {
        return [
            this.customMove(CustomMoveType.ChoosePlayer, Heir.WhiteTiger),
            this.customMove(CustomMoveType.ChoosePlayer, Heir.BlackPanther)
        ]
    }

    onCustomMove(move: CustomMove) {
        this.memorize(Memory.StartPlayer, move.data)
        this.memorize(Memory.CheetahPlayer, this.player)
        return this.afterEffectPlayed()
    }
}