import PlayAnimal from './PlayAnimal'
import WinTrick from './WinTrick'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayAnimal | WinTrick

export default Move