import BlockAnimalInHand from './BlockAnimalInHand'
import BlockAnimalInPile from './BlockAnimalInPile'
import DealCards from './DealCards'
import MovePileAnimal from './MovePileAnimal'
import PlayAnimal from './PlayAnimal'
import RevealAnimal from './RevealAnimal'
import Score from './Score'
import WinTrick from './WinTrick'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayAnimal | WinTrick | RevealAnimal | MovePileAnimal | BlockAnimalInHand | BlockAnimalInPile | DealCards | Score

export default Move