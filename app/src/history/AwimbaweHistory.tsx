import { css, Interpolation, Theme } from '@emotion/react'
import { isHyena } from '@gamepark/awimbawe/material/Animal'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { CustomMoveType } from '@gamepark/awimbawe/rules/CustomMoveType'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCustomMoveType, isEndGame, isMoveItemType, isStartPlayerTurn, isStartRule, MaterialMove } from '@gamepark/rules-api'
import { playerColor } from '../panels/PlayerPanels'
import { CheetahStartsHistory } from './entry/CheetahRuleHistory'
import { PlayerChooseCardHistory } from './entry/ChooseCardHistory'
import { EndGameHistory } from './entry/EndGameHistory'
import { RoundWinnerHistory } from './entry/EndOfTurnRuleHistory'
import { RhinocerosHistory, RhinoPassHistory } from './entry/RhinocerosRuleHistory'
import { SnakeHistory, SnakePassHistory } from './entry/SnakeRuleHistory'
import { WinHyenaHistory, WinTrickHistory } from './entry/SolveTrickHistory'

const playerBackground = (player?: Heir): Interpolation<Theme> =>
  player !== undefined
    ? css`
        background-color: ${playerColor[player]}20;
      `
    : undefined

const winStyle = css`
  color: green;
  font-style: italic;
  text-align: center;
  font-weight: bold;
  padding-top: 1em;
  padding-bottom: 1em;
`

const winTrick = css`
  color: grey;
  font-style: italic;
  text-align: center;
`

const endOfGameStyle = css`
  color: grey;
  text-align: center;
  font-style: italic;
`

export class AwimbaweHistory implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, { game, action, consequenceIndex }: MoveComponentContext): MovePlayedLogDescription | undefined {
    const actionPlayer = action.playerId as Heir | undefined

    if (isEndGame(move)) {
      return { Component: EndGameHistory, css: endOfGameStyle }
    }

    if (game.rule?.id === RuleId.Cheetah && isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) {
      return { Component: CheetahStartsHistory, depth: 1, css: playerBackground(actionPlayer) }
    }

    if (game.rule?.id === RuleId.ChooseCard && isMoveItemType(MaterialType.AnimalCard)(move) && consequenceIndex === undefined) {
      return { Component: PlayerChooseCardHistory, player: actionPlayer, css: playerBackground(actionPlayer) }
    }

    if (game.rule?.id === RuleId.Snake) {
      if (isMoveItemType(MaterialType.AnimalCard)(move) && move.location?.rotation?.z === 1) {
        return { Component: SnakeHistory, depth: 1, css: playerBackground(actionPlayer) }
      }
      if (consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
        return { Component: SnakePassHistory, player: actionPlayer, css: playerBackground(actionPlayer) }
      }
    }

    if (game.rule?.id === RuleId.Rhinoceros) {
      if (isMoveItemType(MaterialType.AnimalCard)(move)) {
        return { Component: RhinocerosHistory, depth: 1, css: playerBackground(actionPlayer) }
      }
      if (consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
        return { Component: RhinoPassHistory, player: actionPlayer, css: playerBackground(actionPlayer) }
      }
    }

    if (game.rule?.id === RuleId.SolveTrick) {
      if (
        isMoveItemType(MaterialType.AnimalCard)(move) &&
        (move.location.type === LocationType.PlayerTrickStack || move.location.type === LocationType.PlayerHyena)
      ) {
        const item = game.items[MaterialType.AnimalCard]?.[move.itemIndex]
        if (item && isHyena(item.id as number) && !move.location.rotation) {
          return { Component: WinHyenaHistory, depth: 1, css: playerBackground(actionPlayer) }
        }
      }
      if (isStartRule(move) && move.id === RuleId.EndOfTurn) {
        return { Component: WinTrickHistory, css: winTrick }
      }
    }

    if (game.rule?.id === RuleId.EndOfTurn && isStartRule(move) && move.id === RuleId.PrepareNewRound) {
      return { Component: RoundWinnerHistory, css: winStyle }
    }

    return
  }
}
