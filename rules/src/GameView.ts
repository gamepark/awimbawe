import Animal from './Animal'
import Heir from './Heir'
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameView will look like at any time during a game.
 * It usually derives from the GameState, because only a few properties change.
 */
type GameView = {
  [key in Heir]: PlayerView
}

export default GameView

export type PlayerView = MyPlayerView | OtherPlayerView

export type MyPlayerView = Omit<PlayerState, 'piles'> & {
  piles: (Animal | null)[][]
}

export type OtherPlayerView = Omit<MyPlayerView, 'hand'> & {
  hand: number
}

export function isOtherPlayerView(player: PlayerState | PlayerView): player is OtherPlayerView {
  return typeof player.hand === 'number'
}

export function isPlayerView(player: PlayerState | PlayerView): player is PlayerView {
  return player.piles.some(pile => pile.some(card => typeof card !== 'object'))
}
