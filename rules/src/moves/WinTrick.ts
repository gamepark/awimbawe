import Animal, { getAnimalPower, isEagle, isElephant, isMouse, sameSuit } from '../Animal'
import GameState, {getPlayers} from '../GameState'
import GameView from '../GameView'
import Heir from '../Heir'
import MoveType from './MoveType'

type WinTrick = {
  type: MoveType.WinTrick
  heir: Heir
}

export default WinTrick

export function winTrickMove(heir: Heir): WinTrick {
  return { type: MoveType.WinTrick, heir }
}

export function winTrick(state: GameState | GameView, move: WinTrick) {
  const player = state[move.heir]
  const players = getPlayers(state)
  player.tricks.push(...players.map(p => p.played!))

  state.lead = move.heir 
  for( const player of players){
    delete player.played
  }
}

export function getWinnerAnimal(animal1: Animal, animal2: Animal) { 
      if (sameSuit(animal1,animal2)){
        if (isMouse(animal1) && isElephant(animal2)){
          return animal1
        }else if (isMouse(animal2) && isElephant(animal1)){
          return animal2
        }else {
          return (getAnimalPower(animal1) > getAnimalPower(animal2) ? animal1 : animal2)
        }
      }else if(!isEagle(animal2)){
          return animal1
      }else{ return animal2 } //TODO fuite et fight
    }
