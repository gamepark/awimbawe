import Animal, {
  getAnimalPower,
  isCheetah, isElephant,
  isMouse,
  sameSuit
} from "../material/Animal";
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
