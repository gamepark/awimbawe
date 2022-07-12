import BlockAnimal, { BlockAnimalRandomized } from './BlockAnimal'
import Move from './Move'

type MoveRandomized = Exclude<Move, BlockAnimal> | BlockAnimalRandomized 

export default MoveRandomized