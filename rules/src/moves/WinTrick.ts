import Animal, {
  getAnimalPower,
  isCheetah,
  isEagle,
  isElephant,
  isMouse,
  sameSuit,
} from "../Animal";
import GameState, { getPlayers } from "../GameState";
import GameView from "../GameView";
import Heir, { otherHeir } from "../Heir";
import MoveType from "./MoveType";

type WinTrick = {
  type: MoveType.WinTrick;
  heir: Heir;
};

export default WinTrick;

export function winTrickMove(heir: Heir): WinTrick {
  return { type: MoveType.WinTrick, heir };
}

export function winTrick(state: GameState | GameView, move: WinTrick) {
  const player = state[move.heir];
  const players = getPlayers(state);
  player.tricks.push(...players.map((p) => p.played!));

  // console.log(player.tricks[player.tricks.length-1],player.tricks[player.tricks.length-2])
  console.log(player)
  if(isCheetah(player.tricks[player.tricks.length-1]) && !isCheetah(player.tricks[player.tricks.length-2])){
    if(getAnimalPower(player.tricks[player.tricks.length-1]) < getAnimalPower(player.tricks[player.tricks.length-2])){
      state.lead = otherHeir(move.heir)
    }else{
      state.lead = move.heir
    }
  }else if(!isCheetah(player.tricks[player.tricks.length-1]) && isCheetah(player.tricks[player.tricks.length-2])){
    if(getAnimalPower(player.tricks[player.tricks.length-1]) > getAnimalPower(player.tricks[player.tricks.length-2])){
      state.lead = otherHeir(move.heir)
    }else{
      state.lead = move.heir
    }
  }else{
    state.lead = move.heir;
  }

  for (const player of players) {
    delete player.played;
  }
} 

export function getWinnerAnimal(animal1: Animal, animal2: Animal) {
  if (sameSuit(animal1, animal2)) {
    if (isMouse(animal1) && isElephant(animal2)) {
      return animal1;
    } else if (isMouse(animal2) && isElephant(animal1)) {
      return animal2;
    } else {
      return getAnimalPower(animal1) > getAnimalPower(animal2)
        ? animal1
        : animal2;
    }
  } else if (!isEagle(animal2)) {
    return animal1;
  } else {
    if (isEagle(animal1) && !isEagle(animal2)) { 
      return animal1;
    } else if(!isEagle(animal1) && isEagle(animal2)){
      return animal2;
    }else{
      return animal1;
    }
  } //TODO fuite et fight
}
