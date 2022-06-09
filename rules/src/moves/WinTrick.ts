import Animal from '../Animal'
import GameState, {getPlayers} from '../GameState'
import GameView from '../GameView'
import Heir from '../Heir'
import MoveType from './MoveType'

type WinTrick = {
  type: MoveType.WinTrick
  heir: Heir
}

export default WinTrick

export function winTrickMove(heir: Heir): WinTrick {
  return { type: MoveType.WinTrick, heir }
}

export function winTrick(state: GameState | GameView, move: WinTrick) {
  const player = state[move.heir]
  const players = getPlayers(state)
  player.tricks.push(...players.map(p => p.played!))
  players.forEach(p => delete p.played)
}

export function getWinnerAnimal(animal1: Animal, _animal2: Animal) {
  return animal1
  // TODO règle animal vainqueur du pli
}
