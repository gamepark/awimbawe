import {getActivePlayer} from '../AwimbaweRules'
import GameState from '../GameState'
import GameView from '../GameView'
import {otherHeir} from '../Heir'
import PileAnimal from '../PileAnimal'
import MoveType from './MoveType'

type MovePileAnimal = {
  type: MoveType.MovePileAnimal,
  origin: number, // index of the animal pile
  destination: number // index of the destination pile
}

export default MovePileAnimal

export function movePileAnimalMove(origin: number, destination: number): MovePileAnimal {
  return {type: MoveType.MovePileAnimal, origin, destination}
}

export function movePileAnimal(state: GameState | GameView, move: MovePileAnimal) {
  const player = getActivePlayer(state)
  const opponent = state[otherHeir(player)]
  if(state[player].piles.length>1){
    opponent.piles[move.destination].unshift(opponent.piles[move.origin].pop() as PileAnimal)
  }
  delete state[player].pendingPower
}

// done