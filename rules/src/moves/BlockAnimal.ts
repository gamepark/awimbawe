import { getActivePlayer } from '../Awimbawe'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type BlockAnimal = {
  type: MoveType.BlockAnimal,
  pileIndex? : number,

}

export default BlockAnimal

 export type BlockAnimalRandomized = BlockAnimal &  { 
  handIndex? : number,
}

export function blockAnimalMove(pileIndex? : number): BlockAnimal {
  return { type: MoveType.BlockAnimal, pileIndex}
}


export function blockAnimal(state: GameState | GameView, move: BlockAnimal){
    const player = getActivePlayer(state)
    // const opponent = state[otherHeir(player)]

    if(state.lead === player){
      // retirer carte au deuxième joueur 
      
    }else{

    }


    // if(state[player].played){}


    // if(isPlayerView(opponent)){
        
    // }else{
        
    // }
    delete state[player].pendingPower
    return move
    //todo
}