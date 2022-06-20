import { getActivePlayer } from '../Awimbawe'
import GameState from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

type BlockAnimal = {
  type: MoveType.BlockAnimal,
  pileIndex : number,

}

export default BlockAnimal

export function blockAnimalMove(origin : number): BlockAnimal {
  return { type: MoveType.BlockAnimal, pileIndex: origin}
}


export function blockAnimal(state: GameState | GameView, move: BlockAnimal){
    const player = getActivePlayer(state)
    // const opponent = state[otherHeir(player)]

    if(state.lead === player){

    }else{

    }


    // if(state[player].played){}


    // if(isPlayerView(opponent)){
        
    // }else{
        
    // }
    delete state[player].pendingPower
    return move

}