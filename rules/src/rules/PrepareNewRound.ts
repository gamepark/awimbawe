import { MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { Memory } from "./Memory";

export class PrepareNewRound extends MaterialRulesPart {
    onRuleStart() {
        const roundWinnerCard = this
            .material(MaterialType.HeirCard)
            .id(this.roundWinner)

        if (roundWinnerCard.getItem()?.rotation?.y === 1) {
            return [this.rules().endGame()]
        }

        const moves = roundWinnerCard.moveItems({ rotation: { y: 1 }})
        
        // TODO: 
        // Melange toutes les cartes
        // ON redistribue en main + colonnes
        // startPlayerTurn(RuleId.ChooseFirstPlayer, this.playerWithLessCrowns)
        return moves
    }

    get playerWithLessCrowns() {
        // TODO: compute crowns
        return this.game.players[0]
    }

    get roundWinner() {
        return this.remind(Memory.RoundWinner)
    }
}