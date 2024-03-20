/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryEntry, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { playerColor } from '../../panels/PlayerPanels'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'

export const SnakeRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (isMoveItemType(MaterialType.AnimalCard)(move)) {
    if (move.location?.rotation?.z === 1) {
      return <SnakeHistory game={game} move={move} context={context}/>
    }
  }

  if (context.consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
    return <SnakePassHistory game={game} context={context}/>
  }
  return null
}

export type SnakeHistoryProps = {
  game: MaterialGame
  move?: MoveItem
} & Omit<AwimbaweHistoryEntryProps, 'move'>

export const SnakePassHistory: FC<SnakeHistoryProps> = (props) => {
  const { context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return (
    <HistoryEntry player={actionPlayer} backgroundColor={playerColor[actionPlayer] + '20'}>
      {t(itsMe ? 'history.snake.pass.me' : 'history.snake.pass', { player: name })}
    </HistoryEntry>
  )
}

export const SnakeHistory: FC<SnakeHistoryProps> = (props) => {
  const { move, game, context } = props
  const actionPlayer = context.action.playerId
  const opponent = game.players.find((p) => p !== actionPlayer)!
  const item = game.items[MaterialType.AnimalCard]![move!.itemIndex]

  if (item.location.type === LocationType.Hand) {
    return (
      <SnakeHandHistory move={move} game={game} context={context} player={actionPlayer} opponent={opponent}/>
    )
  }

  return (
    <SnakeColumnHistory move={move} game={game} context={context} player={actionPlayer} opponent={opponent}/>
  )
}

type SnakeDetailHistoryProps = SnakeHistoryProps & { player: Heir, opponent: Heir }

export const SnakeColumnHistory: FC<SnakeDetailHistoryProps> = (props) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const { context, player, opponent } = props
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return (
      <HistoryEntry depth={1} backgroundColor={playerColor[context.action.playerId] + '20'}>
        {t('history.snake.paralize.column.other.me', { player: playerName })}
      </HistoryEntry>
    )
  }

  return (
    <HistoryEntry depth={1} backgroundColor={playerColor[context.action.playerId] + '20'}>
      <>{t(itsMe ? 'history.snake.paralize.column.me' : 'history.snake.paralize.column', { opponent: opponentName, player: playerName })}</>
    </HistoryEntry>
  )
}

export const SnakeHandHistory: FC<SnakeDetailHistoryProps> = (props) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const { context, player, opponent } = props
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return (
      <HistoryEntry depth={1} backgroundColor={playerColor[context.action.playerId] + '20'}>
        {t('history.snake.paralize.hand.other.me', { player: playerName })}
      </HistoryEntry>
    )
  }

  return (
    <HistoryEntry depth={1} backgroundColor={playerColor[context.action.playerId] + '20'}>
      <>{t(itsMe ? 'history.snake.paralize.hand.me' : 'history.snake.paralize.hand', { opponent: opponentName, player: playerName })}</>
    </HistoryEntry>
  )
}