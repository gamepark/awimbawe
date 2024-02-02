/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { HistoryEntryOptions } from '@gamepark/react-client'
import { usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const getRoundEndHistory = (move: MaterialMove, game: MaterialGame, options: HistoryEntryOptions) => {
  if (!isStartRule(move) || move.id !== RuleId.PrepareNewRound) return
  return <RoundWinnerHistory move={move} game={game} options={options} />
}

export type RoundWinnerHistoryProps = {
  move: MaterialMove
  game: MaterialGame
  options: HistoryEntryOptions
}

export const RoundWinnerHistory: FC<RoundWinnerHistoryProps> = (props) => {
  const { options, game } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const lead = game.memory[Memory.Winner]
  const winnerName = usePlayerName(lead)

  return <div css={css`color: green; font-style: italic; text-align: center; font-weight: bold`}>{t(itsMe ? 'history.win.me' : 'history.win', { player: winnerName })}</div>
}