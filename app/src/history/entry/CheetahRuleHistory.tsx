import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const CheetahStartsHistory = ({ move, context }: MoveComponentProps<CustomMove>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponent = usePlayerName(move?.data)

  if (move?.data === playerId) {
    return <>{t(itsMe ? 'history.cheetah.istart.me' : 'history.cheetah.other.me', { player: name })}</>
  }

  if (move?.data === actionPlayer) {
    return <>{t('history.cheetah.other.itself', { player: name })}</>
  }

  return <>{t(itsMe ? 'history.cheetah.istart' : 'history.cheetah.other', { player: name, opponent: opponent })}</>
}
