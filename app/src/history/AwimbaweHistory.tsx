/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { HistoryDescription, HistoryEntryOptions } from '@gamepark/react-client'
import { isStartPlayerTurn, MaterialGame, MaterialMove, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { getChooseCardEntry } from './entry/ChooseCardHistory'
import { EndGameHistory } from './entry/EndGameHistory'
import { NewRoundHistory } from './entry/NewRoundHistory'
import { getRhinoEntry } from './entry/RhinoHistory'
import { getRoundEndHistory } from './entry/RoundEndHistory'
import { getSnakeEntry } from './entry/SnakeHistory'
import { getSolveTrickEntry } from './entry/SolveTrickHistory'

export class AwimbaweHistory implements HistoryDescription<MaterialGame, MaterialMove> {
  getHistoryEntry(move: MaterialMove, options: HistoryEntryOptions) {
    const game = options.getGameBefore()

    if (isStartPlayerTurn(move) && move.id === RuleId.ChooseCard && game.rule?.id === RuleId.EndOfTurn) {
      return <NewRoundHistory />
    }

    if (game.rule?.id === RuleId.ChooseCard) {
      return getChooseCardEntry(move, game, options)
    }

    if (game.rule?.id === RuleId.Snake) {
      return getSnakeEntry(move, game, options)
    }

    if (game.rule?.id === RuleId.Rhinoceros) {
      return getRhinoEntry(move, game, options)
    }

    if (game.rule?.id === RuleId.SolveTrick) {
      return getSolveTrickEntry(move, game, options)
    }

    if (game.rule?.id === RuleId.EndOfTurn) {
      return getRoundEndHistory(move, game, options)
    }

    if (move.kind === MoveKind.RulesMove && move.type === RuleMoveType.EndGame) {
      return <EndGameHistory />
    }

    return undefined
  }
}