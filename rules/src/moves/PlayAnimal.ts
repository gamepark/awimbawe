import Animal, {isRhinoceros} from '../Animal'
import GameState from '../GameState'
import GameView, {getCardAnimal, PlayerView} from '../GameView'
import Heir from '../Heir'
import PlayerState from '../PlayerState'
import MoveType from './MoveType'

type PlayAnimal = {
  type: MoveType.PlayAnimal
  heir: Heir
  animal: Animal
}

export default PlayAnimal

export type PlayAnimalView = PlayAnimal & {
  handIndex?: number
}

export function playAnimalMove(heir: Heir, animal: Animal): PlayAnimal {
  return {type: MoveType.PlayAnimal, heir, animal}
}

export function playAnimal(state: GameState, move: PlayAnimal) {
  const player = state[move.heir]
  putAnimalInPlayArea(player, move.animal)
  player.hand = player.hand.filter(card => card.animal !== move.animal)
  player.piles = player.piles.map(p => p.filter(pileAnimal => pileAnimal.animal !== move.animal))
}

export function playAnimalInView(state: GameView, move: PlayAnimalView) {
  const player = state[move.heir]
  putAnimalInPlayArea(player, move.animal)
  const isFromPile = player.piles.some(pile => pile.some(card => card.animal === move.animal))
  if (isFromPile) {
    player.piles = player.piles.map(p => p.filter(card => card.animal !== move.animal))
  } else {
    const handIndex = move.handIndex ?? player.hand.findIndex(card => getCardAnimal(card) === move.animal)
    player.hand.splice(handIndex, 1)
  }
}

function putAnimalInPlayArea(player: PlayerState | PlayerView, animal: Animal) {
  player.played = animal
  if (isRhinoceros(animal) /*|| isSerpent(move.animal)*/) {
    player.pendingPower = true
  }
}
