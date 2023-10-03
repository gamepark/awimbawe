import Animal from './material/Animal'
import PileAnimal from './PileAnimal'
import StockAnimal from './StockAnimal'

export default interface PlayerState {
  score: number
  hand: StockAnimal[]
  piles: PileAnimal[][]
  played?: Animal
  tricks: Animal[]
  pendingPower?: boolean
}