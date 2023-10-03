import { ItemMove, PlayerTurnRule, isMoveItemType } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { RuleId } from "./RuleId"
import Animal, { isEagle, sameSuit } from "../material/Animal"
import { Memory } from "./Memory"

export class ChooseCardRule extends PlayerTurnRule {
    getPlayerMoves() {
        const cardsInPlayingArea = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea)
        const availableAnimals = this
            .material(MaterialType.AnimalCard)
            .location((location) => location.type === LocationType.Hand || location.type === LocationType.Table)
            .rotation((rotation) => !rotation?.y)
            .player(this.player)

        if (!cardsInPlayingArea.length) {
            return availableAnimals.moveItems({ location: { type: LocationType.PlayArea, player: this.player, x: 0 }})
        }

        const allCards: Animal[] = availableAnimals.getItems().map((item) => item.id)
        return availableAnimals
            .filter((item) => this.canPlay(item.id, cardsInPlayingArea.getItem()!.id, allCards))
            .moveItems({ location: { type: LocationType.PlayArea, player: this.player, x: 1 }})
    }

    afterItemMove(move: ItemMove) {
        if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []

        const player = this.player
        if (player !== this.lead) {
            return [this.rules().startPlayerTurn(RuleId.SolveTrick, this.nextPlayer)]
        }

        return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
    }

    canPlay(animal: Animal, opponentAnimal: Animal, availableAnimals: Animal[]) {
        if (availableAnimals.some(animal => sameSuit(animal, opponentAnimal))) {
          return sameSuit(animal, opponentAnimal)
        } else if (availableAnimals.some(animal => isEagle(animal))) {
          return isEagle(animal)
        } else {
          return true
        }
    }

    get lead() {
        return this.remind(Memory.Lead)
    }
}