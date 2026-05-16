import { AwimbaweRules } from '@gamepark/awimbawe/AwimbaweRules'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const RoundWinnerHistory = ({ move, context }: MoveComponentProps<MaterialMove>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = new AwimbaweRules(context.game)
  rules.play(move)
  const roundSummary = rules.game.memory[Memory.RoundSummary]
  const winner = roundSummary[roundSummary.length - 1].winner
  const itsMe = playerId && winner === playerId
  const winnerName = usePlayerName(winner)
  return <>{t(itsMe ? 'history.win.me' : 'history.win', { player: winnerName })}</>
}
