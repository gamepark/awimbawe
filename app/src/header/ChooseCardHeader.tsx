/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { useGame, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const ChooseCardHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const playerName = usePlayerName(game.rule!.player!)

  if (player && rules?.isTurnToPlay(player)) {
    return <>{t('header.choose-card.me')}</>
  } else {
    return <>{t('header.choose-card', { player: playerName })}</>
  }
}
