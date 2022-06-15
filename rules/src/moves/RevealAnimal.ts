import Animal from '../Animal'
import GameState from '../GameState'
import GameView from '../GameView'
import Heir from '../Heir'
import MoveType from './MoveType'

type RevealAnimal = {
  type: MoveType.RevealAnimal
  heir: Heir
  pileIndex: number
}

export type RevealAnimalView = RevealAnimal & {
  animal: Animal
}

export default RevealAnimal

export function revealAnimalMove(heir: Heir, pileIndex : number): RevealAnimal {
  return { type: MoveType.RevealAnimal, heir, pileIndex }
}

export function revealAnimal(game : GameState , move : RevealAnimal) {
  
    const player = game[move.heir]
    const pile = player.piles[move.pileIndex]

    pile[pile.length-1].faceUp = true 


}

export function revealAnimalInView(game : GameView, move : RevealAnimalView){
  
  const player = game[move.heir]
  const pile = player.piles[move.pileIndex]

  pile[pile.length-1] = move.animal

}

