/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { HistoryEntry, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'


export const EndOfTurnRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (!isStartRule(move) || move.id !== RuleId.PrepareNewRound) return null
  return <RoundWinnerHistory move={move} game={game} context={context}/>
}

export const RoundWinnerHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { context, move } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = new AwimbaweRules(context.game)
  rules.play(move)
  const roundSummary = rules.game.memory[Memory.RoundSummary]
  const winner = roundSummary[roundSummary.length - 1].winner
  const itsMe = playerId && winner === playerId
  const winnerName = usePlayerName(winner)
  return <HistoryEntry border css={winStyle}>{t(itsMe ? 'history.win.me' : 'history.win', { player: winnerName })}</HistoryEntry>
}

const winStyle = css`
  color: green;
  font-style: italic;
  text-align: center;
  font-weight: bold;
  padding-top: 1em;
  padding-bottom: 1em;
`