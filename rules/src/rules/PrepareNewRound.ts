import { ItemPosition, MaterialMove, MaterialRulesPart, MoveItem, isShuffleItemType } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { Memory } from "./Memory";
import { RuleId } from "./RuleId";
import { LocationType } from "../material/LocationType";
import { START_HAND } from "../AwimbaweSetup";

export class PrepareNewRound extends MaterialRulesPart {
    onRuleStart() {
        const roundWinnerCard = this
            .material(MaterialType.HeirCard)
            .id(this.getWinner())

        if (roundWinnerCard.getItem()?.rotation?.y === 1) {
            return [this.rules().endGame()]
        }

        const moves: MaterialMove[] = roundWinnerCard.moveItems({ rotation: { y: 1 }})

        const moveToDeck = this
            .material(MaterialType.AnimalCard)
            .moveItems({ location: { type: LocationType.Deck }})

        for (const move of moveToDeck) {
            moves.push(move)    
        }
        
        moves.push(this.material(MaterialType.AnimalCard).shuffle())
        return moves
    }

    afterItemMove(move: MoveItem) {
        if (isShuffleItemType(MaterialType.AnimalCard)(move)) {
            const moves = this.fillHandAndColumnMoves
            const looser = this.game.players.find((p) => p !== this.getWinner())!
            moves.push(this.rules().startPlayerTurn(RuleId.ChoosePlayer, looser))
            return moves
        }

        return []
    }

    get fillHandAndColumnMoves() {
        const moves: MaterialMove[] = []
        const cards = this.material(MaterialType.AnimalCard).sort((item) => -item.location.x!)
            
        const indexes = cards.limit((START_HAND + 8) * 2).getIndexes()
        for (const player of this.game.players) {
            const playerIndexes = indexes.splice(0, START_HAND + 8)

            const drawnIndexes = playerIndexes.splice(0, START_HAND)
            const drawnCards = cards.indexes(drawnIndexes)
            const drawCardMoves = drawnCards.moveItems({ location: { type: LocationType.Hand, player }})

            for (const move of drawCardMoves) {
                moves.push(move)
            }
            

            for (let i = 0; i < 8; i++) {
                const column = (i % 4) + 1
                const position: Partial<ItemPosition> = { 
                    location: { type: LocationType.PlayerColumns, player, id: column },
                    rotation: i < 4? { y: 1 }: { y: 0 }
                }

                const cardIndex = playerIndexes.shift()
                const card = cards.index(cardIndex!)
                moves.push(card.moveItem(position))
            }

        }

        return moves
    }

    getWinner() {
        return this.remind(Memory.Winner)
    }

    getLead() {
        return this.remind(Memory.Lead)
    }
}