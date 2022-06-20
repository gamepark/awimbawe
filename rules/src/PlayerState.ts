import Animal from './Animal'
import PileAnimal from './PileAnimal'

export default interface PlayerState {
  score: number
  hand: Animal[]
  piles: PileAnimal[][]
  played?: Animal
  tricks: Animal[]
  pendingPower?: boolean
  blockedAnimal?: Animal
}