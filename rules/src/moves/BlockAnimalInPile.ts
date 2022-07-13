import { getActivePlayer } from '../Awimbawe'
import GameState from '../GameState'
import GameView from '../GameView'
import { otherHeir } from '../Heir'
import MoveType from './MoveType'

type BlockAnimalInPile = {
  type: MoveType.BlockAnimalInPile,
  pileIndex: number,

}

export default BlockAnimalInPile;

export function blockAnimalInPileMove(pileIndex: number): BlockAnimalInPile {
  return { type: MoveType.BlockAnimalInPile, pileIndex }
}

export function blockAnimalInPile(state: GameState | GameView, move: BlockAnimalInPile) {
  const player = getActivePlayer(state)
  const opponent = state[otherHeir(player)]

  const pile = opponent.piles[move.pileIndex]
  pile[pile.length - 1].blocked = true

  delete state[player].pendingPower
}