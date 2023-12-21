import { MaterialRulesPart } from '@gamepark/rules-api'
import Heir from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends MaterialRulesPart {
    onRuleStart() {
        const moves = []

        const cards = this
            .material(MaterialType.AnimalCard)
            .location((location) => location.type === LocationType.Hand || location.type === LocationType.PlayerColumns)
        
        if (!cards.length || this.someoneHasFourHyenas()) {
            moves.push(this
              .material(MaterialType.AnimalCard)
              .location(LocationType.PlayerTrickStack)
              .rotation(true)
              .moveItemsAtOnce({ rotation: false }))
            moves.push(this.rules().startRule(RuleId.PrepareNewRound))
            return moves;
        }


        const cardsOnTable = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayerColumns)

        const hiddenCards = cardsOnTable
            .rotation((rotation: any) => rotation?.y === 1)
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
                    ...cardsOnTable.index(index).rotateItems((item) => {
                        const { y, ...rotation } =  item.location.rotation
                        return item.location.rotation.z ? { ...rotation }: false
                    })
                )
            }
        }
        
        const nextStartPlayer = this.nextStartPlayer
        if (nextStartPlayer) {
            this.memorize(Memory.Lead, nextStartPlayer)    
        }

        moves.push(this.rules().startPlayerTurn(RuleId.ChooseCard, this.lead))

        return moves
    }

    get nextStartPlayer() {
        return this.remind(Memory.StartPlayer)
    }
    
    someoneHasFourHyenas() {
        const players = this.game.players
        for(const player of players) {
            const hasFourHienas = this.hasFourHyenas(player)
            if (hasFourHienas) return true
        }

      return false
    }

    hasFourHyenas(player: Heir) {
        const hyenas = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayerHyena)
            .player(player) 
            .length
    
        if (hyenas === 4) {
            return true
        }

        return false
    }

    get lead() {
        return this.remind(Memory.Lead)
    }

    onRuleEnd() {
        this.forget(Memory.StartPlayer)
        return []
    }
}
