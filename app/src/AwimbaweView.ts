import GameView from '@gamepark/awimbawe/GameView'
import { blockAnimalInHand } from '@gamepark/awimbawe/moves/BlockAnimalInHand'
import { blockAnimalInPile } from '@gamepark/awimbawe/moves/BlockAnimalInPile'
import {movePileAnimal} from '@gamepark/awimbawe/moves/MovePileAnimal'
import MoveType from '@gamepark/awimbawe/moves/MoveType'
import MoveView from '@gamepark/awimbawe/moves/MoveView'
import {playAnimalInView} from '@gamepark/awimbawe/moves/PlayAnimal'
import {revealAnimalInView} from '@gamepark/awimbawe/moves/RevealAnimal'
import {winTrick} from '@gamepark/awimbawe/moves/WinTrick'
import {Game} from '@gamepark/rules-api'

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class AwimbaweView implements Game<GameView, MoveView> {
  state: GameView;

  constructor(state: GameView) {
    this.state = state;
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove(): void | MoveView {
    return;
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.PlayAnimal:
        playAnimalInView(this.state, move);
        break;
      case MoveType.WinTrick:
        winTrick(this.state, move);
        break;
      case MoveType.RevealAnimal:
        revealAnimalInView(this.state, move);
        break;
      case MoveType.MovePileAnimal:
        movePileAnimal(this.state, move);
        break;
      case MoveType.BlockAnimalInPile:
        blockAnimalInPile(this.state, move);
        break;
        case MoveType.BlockAnimalInHand:
        blockAnimalInHand(this.state, move);
        break;
    }
  }
}
