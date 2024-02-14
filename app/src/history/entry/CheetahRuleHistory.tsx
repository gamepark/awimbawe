/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/awimbawe/rules/CustomMoveType'
import { usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'
import { ActionHistory } from './ActionHistory'


export const CheetahRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (!isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) return null
  return <CheetahStartsHistory move={move} game={game} context={context} />
}

export type CheetahStartsHistoryProps = {
  game: MaterialGame
  move?: CustomMove
} & Omit<AwimbaweHistoryEntryProps, 'move'>

export const CheetahStartsHistory: FC<CheetahStartsHistoryProps> = (props) => {
  const { move, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  const opponent = usePlayerName(move?.data)

  if (move?.data === playerId) {
    return (
      <ActionHistory consequence context={context}>
        <>{t(itsMe? 'history.cheetah.istart.me': 'history.cheetah.other.me', { player: name })}</>
      </ActionHistory>
    )
  }

  if (move?.data === actionPlayer) {
    return (
      <ActionHistory consequence context={context}>
        <>{t('history.cheetah.other.itself', { player: name })}</>
      </ActionHistory>
    )
  }

  return (
    <ActionHistory consequence context={context}>
      <>{t(itsMe? 'history.cheetah.istart': 'history.cheetah.other', { player: name, opponent: opponent })}</>
    </ActionHistory>
  )
}