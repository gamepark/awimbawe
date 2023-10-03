/** @jsxImportSource @emotion/react */
import GameView from '@gamepark/awimbawe/GameView'
import { getPlayerName } from '@gamepark/awimbawe/AwimbaweOptions'
import { useTranslation } from 'react-i18next'
import { usePlayerId } from '@gamepark/react-game'

type Props = {
  loading: boolean
  game?: GameView
}

export default function HeaderText({loading}: Props) {
  const {t} = useTranslation()
  const playerId = usePlayerId()
  if (loading) return <>{t('Game loading...')}</>
  return <>Loaded! Now what? Your player id is {getPlayerName(playerId, t)}</>
}