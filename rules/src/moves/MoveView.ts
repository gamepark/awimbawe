import Move from './Move'
import PlayAnimal, {PlayAnimalView} from './PlayAnimal'
import RevealAnimal, {RevealAnimalView} from './RevealAnimal'

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Exclude<Move, RevealAnimal | PlayAnimal> | RevealAnimalView | PlayAnimalView

export default MoveView