import { getActivePlayer } from "../Awimbawe";
import GameState from "../GameState";
import GameView from "../GameView";
import { otherHeir } from "../Heir";
import MoveType from "./MoveType";

type BlockAnimalInHand = {
  type: MoveType.BlockAnimalInHand;
  handIndex: number;
};

export default BlockAnimalInHand;

export function blockAnimalInHandMove(handIndex: number): BlockAnimalInHand {
  return { type: MoveType.BlockAnimalInHand, handIndex };
}

export function blockAnimalInHand( state: GameState | GameView, move: BlockAnimalInHand) {
  const player = getActivePlayer(state);
  const opponent = state[otherHeir(player)];
  // if(getAvailableAnimals(player).length>1){
    opponent.hand[move.handIndex].blocked = true;
  // }
  //question
  delete state[player].pendingPower;
}
