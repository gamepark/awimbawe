import { CustomMove, MaterialMove } from "@gamepark/rules-api"
import { CustomMoveType, EagleChoice } from "../CustomMoveType"
import { CardRule } from "./CardRule"
import { MaterialType } from "../../material/MaterialType"
import { LocationType } from "../../material/LocationType"
import { Memory } from "../Memory"
import { RuleId } from "../RuleId"

export class EagleRule extends CardRule {
    getPlayerMoves() {
        return [
            this.rules().customMove(CustomMoveType.EagleChoice, EagleChoice.Runaway),
            this.rules().customMove(CustomMoveType.EagleChoice, EagleChoice.Attack)
        ]
    }

    onCustomMove(move: CustomMove) {
        if (EagleChoice.Runaway === move.data) {
            return this.runaway()
        }

        return this.afterEffectPlayed()
    }

    runaway() {
        const mineCard = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayArea)
            .player(this.player)

        const opponent = this.game.players.find((p) => p !== this.player)
        const opponentCard = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayArea)
            .player(opponent)
            
        const moves: MaterialMove[] = []

        moves.push(
            mineCard.moveItem({ 
                location: {
                    type: LocationType.PlayerTrickStack,
                    player: this.player
                }
            })
        )

        moves.push(
            opponentCard.moveItem({ 
                location: {
                    type: LocationType.PlayerTrickStack,
                    player: opponent
                }
            })
        )

        this.memorize(Memory.Lead, opponent)
        moves.push(this.rules().startRule(RuleId.EndOfTurn))
        return moves
    }
}