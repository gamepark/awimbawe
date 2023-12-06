import { ItemMove, MaterialMove, MoveItem, PlayerTurnRule, isMoveItemType } from "@gamepark/rules-api"
import { MaterialType } from "../material/MaterialType"
import { LocationType } from "../material/LocationType"
import { RuleId } from "./RuleId"
import Animal, { isCheetah, isEagle, isRhinoceros, isSnake, sameSuit } from "../material/Animal"
import { Memory } from "./Memory"

export class ChooseCardRule extends PlayerTurnRule {
    getPlayerMoves() {
        const cardsInPlayingArea = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea)
        const availableAnimals = this.getPlayableCards()

        if (!cardsInPlayingArea.length) {
            return availableAnimals.moveItems({ type: LocationType.PlayArea, player: this.player, x: 0 })
        }

        const allCards: Animal[] = availableAnimals.getItems().map((item) => item.id)
        return availableAnimals
            .filter((item) => this.canPlay(item.id, cardsInPlayingArea.getItem()!.id, allCards))
            .moveItems({ type: LocationType.PlayArea, player: this.player, x: 1 })
    }

    getPlayableCards() {
        const allPlayerCards = this
            .material(MaterialType.AnimalCard)
            .location((location) => location.type === LocationType.Hand || location.type === LocationType.PlayerColumns)
            .player(this.player)

        return allPlayerCards
            .filter((item) => {
                if (item.location?.rotation?.z) return false
                if (item.location.type === LocationType.Hand) return true
                if (item.location?.rotation?.y) return false

                const hasAnItemOnTop = allPlayerCards.getItems().some((other) => 
                    other.location.type === item.location.type &&
                    other.location.id === item.location.id &&
                    (other.location.x ?? 0) > (item.location.x  ?? 0)
                )

                return !hasAnItemOnTop
            })
    }

    afterItemMove(move: ItemMove) {
        if (!isMoveItemType(MaterialType.AnimalCard)(move)) return []
        if (!move.location || move.location.type !== LocationType.PlayArea) return []

        const moves: MaterialMove[] = this.material(MaterialType.AnimalCard)
            .player(this.player)
            .rotation((rotation: Record<string, any>) => rotation?.z === 1)
            .moveItems((item) => ({
                rotation: {
                    ...item.location.rotation,
                    z: 0
                }
            }))

        const ruleId = this.getCardRule(move)
        if (ruleId) {
            moves.push(this.rules().startRule(ruleId))
            return moves
        }

        const player = this.player
        if (player !== this.lead) {
            moves.push(this.rules().startRule(RuleId.SolveTrick))
            return moves
        }

        moves.push(this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer))
        return moves
    }

    getCardRule(move: MoveItem): RuleId | undefined {
        const item = this.material(MaterialType.AnimalCard).getItem(move.itemIndex)!
        
        const player = this.player
        const opponent = this.game.players.find((p) => p !== this.player)
        const opponentCard = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea).player(opponent).getItem()
        const followsPlayer = opponentCard && isEagle(opponentCard.id)
        if (player !== this.lead && !followsPlayer && isEagle(item.id)) {
            return RuleId.Eagle
        }

        const opponentCards = this.material(MaterialType.AnimalCard)
            .location((location) => location.type === LocationType.PlayerColumns || location.type === LocationType.Hand)
            .player(opponent)

        const opponentCardCount = opponentCards.length
        if (opponentCardCount >= 2 && isSnake(item.id)) {
            return RuleId.Snake
        }

        const cardsInOpponentColumn = opponentCards
            .location(LocationType.PlayerColumns)
            .length

        if (cardsInOpponentColumn > 1 && isRhinoceros(item.id)) {
            return RuleId.Rhinoceros
        }

        const myCards = this.material(MaterialType.AnimalCard)
          .location((location) => location.type === LocationType.PlayerColumns || location.type === LocationType.Hand)
          .player(this.player)
        if ((opponentCardCount > 1  || (opponentCardCount === 1 && myCards.length === 1))  && isCheetah(item.id)) {
            return RuleId.Cheetah
        }

        return
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
