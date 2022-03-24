import GameView, {PlayerView} from './GameView'
import Heir from './Heir'
import PlayerState from './PlayerState'

type GameState = {
  [Heir.WhiteTiger]: PlayerState
  [Heir.BlackPanther]: PlayerState
  lead: Heir
}

export default GameState

export function getPlayers(state: GameState): PlayerState[]
export function getPlayers(state: GameView): PlayerView[]
export function getPlayers(state: GameState | GameView): (PlayerState | PlayerView)[]
export function getPlayers(state: GameState | GameView): (PlayerState | PlayerView)[] {
  return [state[Heir.WhiteTiger], state[Heir.BlackPanther]]
}