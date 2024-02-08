/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/awimbawe/rules/CustomMoveType'
import { PlayerHistoryEntry, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'


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
      <PlayerHistoryEntry border context={context}>
        <>{t(itsMe? 'history.cheetah.istart.me': 'history.cheetah.other.me', { player: name })}</>
      </PlayerHistoryEntry>
    )
  }

  if (move?.data === actionPlayer) {
    return (
      <PlayerHistoryEntry border context={context}>
        <>{t('history.cheetah.other.itself', { player: name })}</>
      </PlayerHistoryEntry>
    )
  }

  return (
    <PlayerHistoryEntry border context={context}>
      <>{t(itsMe? 'history.cheetah.istart': 'history.cheetah.other', { player: name, opponent: opponent })}</>
    </PlayerHistoryEntry>
  )
}