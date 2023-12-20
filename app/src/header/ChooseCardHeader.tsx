/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { useGame, useLegalMoves, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const ChooseCardHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const legalMoves = useLegalMoves()
  const playerName = usePlayerName(game.rule!.player!)
  const me = player && legalMoves.length

  if (me) {
    return <>{t('header.choose-card.me')}</>
  } else {
    return <>{t('header.choose-card', { player: playerName })}</>
  }
}
