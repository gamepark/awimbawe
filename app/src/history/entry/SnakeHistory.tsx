/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryEntryOptions } from '@gamepark/react-client'
import { PlayerActionHistory, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const getSnakeEntry = (move: MaterialMove, game: MaterialGame, options: HistoryEntryOptions) => {
  if (isMoveItemType(MaterialType.AnimalCard)(move)) {
    if (move.location?.rotation?.z === 1) {
      return <SnakeHistory game={game} move={move} options={options} />
    }
  }

  if (options.consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
    return <SnakePassHistory game={game} move={move} options={options} />
  }
  return undefined
}

export type SnakePassHistoryProps = {
  move: RuleMove
  game: MaterialGame
  options: HistoryEntryOptions
}

export const SnakePassHistory: FC<SnakePassHistoryProps> = (props) => {
  const { options } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return (
    <PlayerActionHistory options={options}>
      {t(itsMe? 'history.snake.pass.me': 'history.snake.pass', { player: name })}
    </PlayerActionHistory>
  )
}


export type SnakeHistoryProps = {
  move: MoveItem
  game: MaterialGame
  options: HistoryEntryOptions
}

export const SnakeHistory: FC<SnakeHistoryProps> = (props) => {
  const { move, game, options } = props
  const actionPlayer = options.action.playerId
  const opponent = game.players.find((p) => p !== actionPlayer)!
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]

  if (item.location.type === LocationType.Hand) {
    return (
      <SnakeHandHistory move={move} game={game} options={options} player={actionPlayer} opponent={opponent} />
    )
  }

  return (
    <SnakeColumnHistory move={move} game={game} options={options} player={actionPlayer} opponent={opponent} />
  )
}

type SnakeDetailHistoryProps = SnakeHistoryProps & { player: Heir, opponent: Heir  }

export const SnakeColumnHistory: FC<SnakeDetailHistoryProps> = (props) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const { options, player, opponent } = props
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return (
      <PlayerActionHistory options={options}>
        {t('history.snake.paralize.column.other.me', { player: playerName })}
      </PlayerActionHistory>
    )
  }

  return (
    <PlayerActionHistory options={options}>
      <>{t(itsMe? 'history.snake.paralize.column.me': 'history.snake.paralize.column', { opponent: opponentName, player: playerName })}</>
    </PlayerActionHistory>
  )
}

export const SnakeHandHistory: FC<SnakeDetailHistoryProps> = (props) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const { options, player, opponent } = props
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return (
      <PlayerActionHistory options={options}>
        {t('history.snake.paralize.hand.other.me', { player: playerName })}
      </PlayerActionHistory>
    )
  }

  return (
    <PlayerActionHistory options={options}>
      <>{t(itsMe? 'history.snake.paralize.hand.me': 'history.snake.paralize.hand', { opponent: opponentName, player: playerName })}</>
    </PlayerActionHistory>
  )
}