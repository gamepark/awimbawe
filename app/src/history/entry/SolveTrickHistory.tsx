import { AwimbaweRules } from '@gamepark/awimbawe/AwimbaweRules'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const WinTrickHistory = ({ move, context }: MoveComponentProps<MaterialMove>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = new AwimbaweRules(context.game)
  useEffect(() => {
    rules.play(move)
  }, [])
  const lead = context.game.memory[Memory.Lead]
  const itsMe = playerId && lead === playerId
  const winnerName = usePlayerName(lead)

  return <>{t(itsMe ? 'history.solve.me' : 'history.solve', { player: winnerName })}</>
}

export const WinHyenaHistory = ({ move }: MoveComponentProps<MoveItem>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = move.location.player
  const itsMe = playerId && actionPlayer === playerId
  const playerName = usePlayerName(actionPlayer)

  return <>{t(itsMe ? 'history.hyena.me' : 'history.hyena', { player: playerName })}</>
}
