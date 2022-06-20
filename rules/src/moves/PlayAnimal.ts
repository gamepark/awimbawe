import Animal, { isRhinoceros } from '../Animal'
import GameState from '../GameState'
import GameView, { isOtherPlayerView, isPlayerView } from '../GameView'
import Heir from '../Heir'
import MoveType from './MoveType'

type PlayAnimal = {
  type: MoveType.PlayAnimal
  heir: Heir
  animal: Animal
}

export default PlayAnimal

export function playAnimalMove(heir: Heir, animal: Animal): PlayAnimal {
  return { type: MoveType.PlayAnimal, heir, animal }
}

export function playAnimal(state: GameState | GameView, move: PlayAnimal) {
  const player = state[move.heir]
  player.played = move.animal
  if(isRhinoceros(move.animal) /*|| isSerpent(move.animal)*/){ 
    player.pendingPower = true 
  }
  if (isOtherPlayerView(player)) {
    const isFromPile = player.piles.some(pile => pile.includes(move.animal))
    if (!isFromPile) {
      player.hand--
    }
  } else {
    player.hand = player.hand.filter(a => a !== move.animal)
  }
  if (isPlayerView(player)) {
    player.piles = player.piles.map(p => p.filter(pileAnimal => pileAnimal !== move.animal))
  } else {
    player.piles = player.piles.map(p => p.filter(pileAnimal => pileAnimal.animal !== move.animal))
    //serpent
  }
}
