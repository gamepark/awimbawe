/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { MaterialHistoryProps } from '@gamepark/react-game'
import { isStartPlayerTurn, MaterialGame, MaterialMove, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { FC } from 'react'
import { CheetahRuleHistory } from './entry/CheetahRuleHistory'
import { ChooseCardRuleHistory } from './entry/ChooseCardHistory'
import { EndGameHistory } from './entry/EndGameHistory'
import { EndOfTurnRuleHistory } from './entry/EndOfTurnRuleHistory'
import { NewRoundHistory } from './entry/NewRoundHistory'
import { RhinocerosRuleHistory } from './entry/RhinocerosRuleHistory'
import { SnakeRuleHistory } from './entry/SnakeRuleHistory'
import { SolveTrickRuleHistory } from './entry/SolveTrickHistory'

export type AwimbaweHistoryEntryProps = {
  game: MaterialGame
} & MaterialHistoryProps

export const AwimbaweHistory: FC<MaterialHistoryProps<MaterialGame, MaterialMove, Heir>> = (props) => {
  const { move, context } = props;
  const game = context.game

  if (isStartPlayerTurn(move) && move.id === RuleId.ChooseCard && game.rule?.id === RuleId.EndOfTurn) {
    return <NewRoundHistory />
  }

  if (game.rule?.id === RuleId.ChooseCard) {
    return <ChooseCardRuleHistory game={game} move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Snake) {
    return <SnakeRuleHistory game={game} move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Rhinoceros) {
    return <RhinocerosRuleHistory game={game} move={move} context={context} />
  }

  if (game.rule?.id === RuleId.SolveTrick) {
    return <SolveTrickRuleHistory game={game} move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Cheetah) {
    return <CheetahRuleHistory game={game} move={move} context={context} />
  }

  if (game.rule?.id === RuleId.EndOfTurn) {
    return <EndOfTurnRuleHistory game={game} move={move} context={context} />
  }

  if (move.kind === MoveKind.RulesMove && move.type === RuleMoveType.EndGame) {
    return <EndGameHistory />
  }

  return <></>
}