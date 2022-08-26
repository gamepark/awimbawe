import GameState from "../GameState";
import GameView from "../GameView";
import Heir from "../Heir";
import MoveType from "./MoveType";


type Score = {
  type: MoveType.Score;
  heir : Heir;
};

export default Score;

export function scoreMove(heir: Heir) : Score {
    return { type: MoveType.Score, heir }
  }

export function score(state : GameView | GameState, move: Score) {
    let player = state[move.heir]
    player.score++;
}

























// export function countPoints()