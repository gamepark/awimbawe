import { MaterialRulesPart } from "@gamepark/rules-api";
import { RuleId } from "./RuleId";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";

export class EndOfTurnRule extends MaterialRulesPart {
    onRuleStart() {
        const moves = []

        const cardsOnTable = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayerColumns)

        const hiddenCards = cardsOnTable
            .rotation((rotation) => rotation?.y === 1)
            .getIndexes()

        for (const index of hiddenCards) {
            const item = cardsOnTable.getItem(index)!
            const cardOnTop = cardsOnTable
                .locationId(item.location.id)
                .player(item.location.player)
                .location((location) => location.x! > item.location.x!)
                .length

            if (!cardOnTop) {
                moves.push(
                    ...cardsOnTable.index(index).moveItems({ rotation: { y: 0 }})
                )
            }
        }
        
        moves.push(this.rules().startPlayerTurn(RuleId.ChooseCard, this.lead))

        return moves
    }

    get lead() {
        return this.remind(Memory.Lead)
    }
}