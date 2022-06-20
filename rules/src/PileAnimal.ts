import StockAnimal from './StockAnimal'

type PileAnimal = StockAnimal & {
  faceUp?: boolean
}

export default PileAnimal