import Animal from './material/Animal'
import Heir from './Heir'
import PlayerState from './PlayerState'
import StockAnimal from './StockAnimal'

/**
 * In here, you describe what a GameView will look like at any time during a game.
 * It usually derives from the GameState, because only a few properties change.
 */
type GameView = {
  [Heir.WhiteTiger]: PlayerView
  [Heir.BlackPanther]: PlayerView
  lead: Heir
}

export default GameView

export type PlayerView = MyPlayerView | OtherPlayerView

export type MyPlayerView = Omit<PlayerState, 'piles'> & {
  piles: Partial<StockAnimal>[][]
}

export type OtherPlayerView = Omit<MyPlayerView, 'hand'> & {
  hand: Omit<StockAnimal, 'animal'>[]
}

export function isKnownCard(card: Partial<StockAnimal>): card is StockAnimal {
  return (card as StockAnimal).animal !== undefined
}

export function getCardAnimal(card: Partial<StockAnimal>): Animal | undefined {
  return isKnownCard(card) ? card.animal : undefined
}

export function isPlayerView(player: PlayerState | PlayerView): player is PlayerView {
  return player.piles.some(pile => pile.some(card => typeof card !== 'object'))
}
