import DealCards, { DealCardsRandomized } from './DealCards'
import Move from './Move'

type MoveRandomized = Exclude < Move , DealCards > | DealCardsRandomized

export default MoveRandomized