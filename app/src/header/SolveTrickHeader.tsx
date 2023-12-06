/** @jsxImportSource @emotion/react */
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const SolveTrickHeader = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const lead = rules?.remind(Memory.Lead)
  const playerName = usePlayerName(lead)
  if (player && lead === player) {
    return <>{t('header.trick.me')}</>
  } else {
    return <>{t('header.trick', { player: playerName })}</>
  }
}
