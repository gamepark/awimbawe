import {
  CustomMove,
  isCustomMoveType,
  isShuffleItemType,
  Location,
  MaterialMove,
  MaterialRulesPart,
  MoveItem
} from '@gamepark/rules-api'
import {START_HAND} from '../AwimbaweSetup'
import {getCrowns} from '../material/Animal'
import Heir from '../material/Heir'
import {LocationType} from '../material/LocationType'
import {MaterialType} from '../material/MaterialType'
import {Memory} from './Memory'
import {RuleId} from './RuleId'
import {CustomMoveType} from "./CustomMoveType";

export class PrepareNewRoundRule extends MaterialRulesPart {
    onRuleStart() {
        const winner = this.winner
        if (!winner) {
          return [this.rules().customMove(CustomMoveType.SamplePlayer)]
        }

        return this.afterWinnerComputed(winner)

    }

    onCustomMove(move: CustomMove) {
      if (!isCustomMoveType(CustomMoveType.SamplePlayer)(move)) return []
      return this.afterWinnerComputed(move.data)
    }

  afterWinnerComputed(winner: Heir) {
      this.memorize(Memory.Winner, winner)
      const roundWinnerCard = this
          .material(MaterialType.HeirCard)
          .id(winner)

      if (roundWinnerCard.getItem()?.location?.rotation) {
        return [this.rules().endGame()]
      }

      const moves: MaterialMove[] = roundWinnerCard.rotateItems(true)


      moves.push(
          this
              .material(MaterialType.AnimalCard)
              .moveItemsAtOnce({type: LocationType.Deck})
      )

      moves.push(this.material(MaterialType.AnimalCard).shuffle())
      const looser = this.game.players.find((p) => p !== winner)!
      moves.push(this.rules().startPlayerTurn(RuleId.ChoosePlayer, looser))
      return moves
    }


    afterItemMove(move: MoveItem) {
        if (isShuffleItemType(MaterialType.AnimalCard)(move)) {
            return this.fillHandAndColumnMoves
        }

        return []
    }

    get fillHandAndColumnMoves() {
        const moves: MaterialMove[] = []
        const cards = this.material(MaterialType.AnimalCard).sort((item) => -item.location.x!)
        const deck = cards.deck()
        for (const player of this.game.players) {
            moves.push(...deck.deal({type: LocationType.Hand, player}, START_HAND))
            for (let i = 0; i < 8; i++) {
                const column = (i % 4) + 1
                const location: Location = {type: LocationType.PlayerColumns, player, id: column}
                if (i < 4) {
                    location.rotation = {y: 1}
                }
                moves.push(deck.dealOne(location))
            }

        }

        return moves
    }

    onRuleEnd() {
        this.forget(Memory.Winner)
        this.forget(Memory.HyenaInTricks)
        return []
    }


    get winner() {
        if (this.hasFourHyenas(Heir.BlackPanther)) {
            return Heir.WhiteTiger
        }

        if (this.hasFourHyenas(Heir.WhiteTiger)) {
            return Heir.BlackPanther
        }

        const pantherCrowns = this.getPlayerCrowns(Heir.BlackPanther)
        const tigerCrowns = this.getPlayerCrowns(Heir.WhiteTiger)

        let lead = undefined
        if (pantherCrowns === tigerCrowns) {
            return lead
        } else if (pantherCrowns < tigerCrowns) {
            lead = Heir.WhiteTiger
        } else {
            lead = Heir.BlackPanther
        }

        return lead
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

    getPlayerCrowns(player: Heir) {
        // Rechercher les MaterialType.AnimalCard dans LocationType.PlayerColumns
        const items = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayerTrickStack)
            .player(player)
            .getItems()

        // Parcourir les cartes, et pour chaque animal, additionner les couronnes
        let count = 0
        for (const item of items) {
            count = count + getCrowns(item.id)
        }

        return count
    }
}
