import {SecretInformation, SequentialGame} from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import {animals} from './Animal'
import {AwimbaweOptions, isGameOptions} from './AwimbaweOptions'
import GameState, {getPlayers} from './GameState'
import GameView, {MyPlayerView, OtherPlayerView} from './GameView'
import Heir, {otherHeir} from './Heir'
import Move from './moves/Move'
import MoveType from './moves/MoveType'
import MoveView from './moves/MoveView'
import {playAnimal, playAnimalMove} from './moves/PlayAnimal'
import {getWinnerAnimal, winTrick, winTrickMove} from './moves/WinTrick'
import PlayerState from './PlayerState'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class Awimbawe extends SequentialGame<GameState, Move, Heir>
  implements SecretInformation<GameState, GameView, Move, MoveView, Heir> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState)
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: AwimbaweOptions)
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | AwimbaweOptions) {
    if (isGameOptions(arg)) {
      const cards = shuffle(animals)
      const whiteTiger = {
        score: 0,
        hand: cards.splice(0, 6),
        piles: [...Array(4)].map(_ => [{animal: cards.pop()!}, {animal: cards.pop()!, faceUp: true}]),
        tricks: []
      }
      const blackPanther = {
        score: 0,
        hand: cards.splice(0, 6),
        piles: [...Array(4)].map(_ => [{animal: cards.pop()!}, {animal: cards.pop()!, faceUp: true}]),
        tricks: []
      }
      const setup: GameState = {
        [Heir.WhiteTiger]: whiteTiger,
        [Heir.BlackPanther]: blackPanther,
        lead: Heir.WhiteTiger // TODO: heir with least crown in piles, or random
      }
      super(setup)
    } else {
      super(arg)
    }
  }

  isOver(): boolean {
    return this.getPlayers().some(player => player.score === 2)
  }

  getPlayers(): PlayerState[] {
    return getPlayers(this.state)
  }

  getActivePlayer(): Heir | undefined {
    return getActivePlayer(this.state)
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(): Move[] {
    const activePlayer = this.getActivePlayer()
    if (!activePlayer) return []
    const player = this.state[activePlayer]
    return [...player.hand, ...player.piles.map(pile => pile[pile.length - 1].animal)].map(animal => playAnimalMove(activePlayer, animal))
    // TODO pouvoir serpent bloquant la carte
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    switch (move.type) {
      case MoveType.PlayAnimal:
        playAnimal(this.state, move)
        break 
      case MoveType.WinTrick:
        winTrick(this.state, move)
        break
    }
  }

  /**
   * Here you can return the moves that should be automatically played when the game is in a specific state.
   * Here is an example from monopoly: you roll a dice, then move you pawn accordingly.
   * A first solution would be to do both state updates at once, in a "complex move" (RollDiceAndMovePawn).
   * However, this first solution won't allow you to animate step by step what happened: the roll, then the pawn movement.
   * "getAutomaticMove" is the solution to trigger multiple moves in a single action, and still allow for step by step animations.
   * => in that case, "RollDice" could set "pawnMovement = x" somewhere in the game state. Then getAutomaticMove will return "MovePawn" when
   * "pawnMovement" is defined in the state.
   * Of course, you must return nothing once all the consequences triggered by a decision are completed.
   * VERY IMPORTANT: you should never change the game state in here. Indeed, getAutomaticMove will never be called in replays, for example.
   *
   * @return The next automatic consequence that should be played in current game state.
   */
  getAutomaticMove(): void | Move {
    if (this.state[Heir.WhiteTiger].played && this.state[Heir.BlackPanther].played) {
      const animal1 = this.state[this.state.lead].played!
      const animal2 = this.state[otherHeir(this.state.lead)].played!
      const winner = getWinnerAnimal(animal1,animal2) === animal1 ? this.state.lead : otherHeir(this.state.lead)
      return winTrickMove(winner) 
    }
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return {
      [Heir.WhiteTiger]: this.getOtherPlayerView(Heir.WhiteTiger),
      [Heir.BlackPanther]: this.getOtherPlayerView(Heir.BlackPanther),
      lead : this.state.lead 
    }
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @param heir Identifier of the player
   * @return GameView that the player is allowed to know
   */
  getPlayerView(heir: Heir): GameView {
    return {
      [Heir.WhiteTiger]: heir === Heir.WhiteTiger ? this.getMyPlayerView(heir) : this.getOtherPlayerView(Heir.WhiteTiger),
      [Heir.BlackPanther]: heir === Heir.BlackPanther ? this.getMyPlayerView(heir) : this.getOtherPlayerView(Heir.BlackPanther),
      lead : this.state.lead 
    }
  }

  getOtherPlayerView(heir: Heir): OtherPlayerView {
    return {...this.getMyPlayerView(heir), hand: this.state[heir].hand.length}
  }

  getMyPlayerView(heir: Heir): MyPlayerView {
    const player = this.state[heir]
    return {...player, piles: player.piles.map(pile => pile.map(card => card.faceUp ? card.animal : null))}
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return MoveView with the information that a person should know about the move that was played
   */
  getMoveView(move: Move): MoveView {
    return move
  }

  /**
   * If you game has secret information, sometime you need to alter a Move depending on which player it is.
   * For example, if a card is drawn, the id of the revealed card should be ADDED to the Move in the MoveView, but only for the played that draws!
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param playerId Identifier of the player seeing the move
   * @return MoveView with the information that this player should know about the move that was played
   */
  getPlayerMoveView(move: Move, playerId: Heir): MoveView {
    console.log(playerId) // TODO: when a new round starts, then only the player can see the cards he received in hand
    return this.getMoveView(move)
  }
}

export function getActivePlayer(state : GameState | GameView): Heir | undefined {
  return state[state.lead].played ? otherHeir(state.lead) : state.lead
}