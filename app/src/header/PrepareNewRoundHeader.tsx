/** @jsxImportSource @emotion/react */
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const PrepareNewRoundHeader = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const winner = rules?.remind(Memory.Winner)
  const playerName = usePlayerName(winner)
  if (player === winner) {
    return <>{t('header.win-round.me')}</>
  }

  return <>{t('header.win-round', { player: playerName })}</>
}
