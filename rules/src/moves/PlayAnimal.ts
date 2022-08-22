import Animal, { isRhinoceros, isSerpent } from '../Animal'
import { countAvailableAnimals } from '../Awimbawe'
import GameState from '../GameState'
import GameView, { getCardAnimal, PlayerView } from '../GameView'
import Heir, { otherHeir } from '../Heir'
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
  if(hasPendingPower(move.animal, state[otherHeir(move.heir)])){
    player.pendingPower = true;
  }
  player.hand = player.hand.filter(card => card.animal !== move.animal)
  player.piles = player.piles.map(p => p.filter(pileAnimal => pileAnimal.animal !== move.animal))
}

export function playAnimalInView(state: GameView, move: PlayAnimalView) {
  const player = state[move.heir]
  putAnimalInPlayArea(player, move.animal)
  if(hasPendingPower(move.animal, state[otherHeir(move.heir)])){
    player.pendingPower = true;
  }
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
  

  if(player.hand.length > 0){
    for(let i = 0; i < player.hand.length; i++){
      delete player.hand[i].blocked;
    }
  }
  
  for(let y = 0; y < player.piles.length; y++){
    if(player.piles[y].length > 0){
      delete player.piles[y][player.piles[y].length-1].blocked;
    }
  }

  //done
}


function hasPendingPower( animal : Animal, opponent : PlayerState | PlayerView ){
  if (isRhinoceros(animal) && canMovePileAnimal(opponent) ) {
    return true 
  } else if(isSerpent(animal) && countAvailableAnimals(opponent)>1){
    return true
  } else{
    return false 
  }

}

function canMovePileAnimal( player : PlayerState | PlayerView ){
  let noneemptypilefound = false;
  for(const pile of player.piles){
    if(pile.length>1){
      return true
    }else if(pile.length==1){
      if (noneemptypilefound) {return true} else noneemptypilefound = true;
    }
  } 
  return false
  

}