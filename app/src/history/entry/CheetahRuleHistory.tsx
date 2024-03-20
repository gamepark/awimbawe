/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/awimbawe/rules/CustomMoveType'
import { HistoryEntry, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { playerColor } from '../../panels/PlayerPanels'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'


export const CheetahRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (!isCustomMoveType(CustomMoveType.ChoosePlayer)(move)) return null
  return <CheetahStartsHistory move={move} game={game} context={context}/>
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
      <HistoryEntry depth={1} backgroundColor={playerColor[actionPlayer] + '20'}>
        <>{t(itsMe ? 'history.cheetah.istart.me' : 'history.cheetah.other.me', { player: name })}</>
      </HistoryEntry>
    )
  }

  if (move?.data === actionPlayer) {
    return (
      <HistoryEntry depth={1} backgroundColor={playerColor[actionPlayer] + '20'}>
        <>{t('history.cheetah.other.itself', { player: name })}</>
      </HistoryEntry>
    )
  }

  return (
    <HistoryEntry depth={1} backgroundColor={playerColor[actionPlayer] + '20'}>
      <>{t(itsMe ? 'history.cheetah.istart' : 'history.cheetah.other', { player: name, opponent: opponent })}</>
    </HistoryEntry>
  )
}