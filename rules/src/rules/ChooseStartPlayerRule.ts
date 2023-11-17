import { CustomMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import Heir from "../material/Heir"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { CustomMoveType } from "./CustomMoveType"
import { RuleId } from "./RuleId"
import { Memory } from "./Memory"

export class ChooseStartPlayerRule extends PlayerTurnRule<Heir, MaterialType, LocationType> {
    getPlayerMoves(): MaterialMove<Heir, MaterialType, LocationType>[] {
      const moves: MaterialMove[] = []
      for (const player of this.game.players) {
        moves.push(this.rules().customMove(CustomMoveType.ChoosePlayer, player))
      }

      return moves
    }
  
    onCustomMove(move: CustomMove): MaterialMove<Heir, MaterialType, LocationType>[] {
      if (move.type === CustomMoveType.ChoosePlayer) {
        this.memorize(Memory.Lead, move.data)
        return [this.rules().startPlayerTurn(RuleId.ChooseCard, move.data)]
      }
      return []
    }
  }