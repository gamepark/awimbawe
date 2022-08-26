import Animal, {
  getAnimalPower,
  isCheetah, isElephant,
  isMouse,
  sameSuit
} from "../Animal";
import GameState, { getPlayers } from "../GameState";
import GameView from "../GameView";
import Heir from "../Heir";
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

  const blackPantherAnimal = state[Heir.BlackPanther].played!;
  const whiteTigerAnimal = state[Heir.WhiteTiger].played!;

  if(isCheetah(blackPantherAnimal) && !isCheetah(whiteTigerAnimal)){
    state.lead = Heir.BlackPanther
  }else if(!isCheetah(blackPantherAnimal) && isCheetah(whiteTigerAnimal)){
    state.lead = Heir.WhiteTiger
  }else{
    state.lead = move.heir;
  }

  for (const player of players) {
    delete player.played;
    delete player.pendingPower;
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
  } else {
    return animal1;
  } 
  
}
