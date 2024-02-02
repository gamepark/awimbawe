/** @jsxImportSource @emotion/react */
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
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const opponentName = usePlayerName(game.players.filter((p) => p !== actionPlayer))
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itsMe = playerId && actionPlayer === playerId

  if (item.location.type === LocationType.Hand) {
    return (
      <PlayerActionHistory options={options}>
        <>{t(itsMe? 'history.snake.paralyze.hand.me': 'history.snake.paralyze.hand', { opponent: opponentName, player: playerName })}</>
      </PlayerActionHistory>
    )
  }

  return (
    <PlayerActionHistory options={options}>
      <>{t(itsMe? 'history.snake.paralyze.column.me': 'history.snake.paralyze.column', { column: item.location.id, opponent: opponentName, player: playerName })}</>
    </PlayerActionHistory>
  )
  return <>{t(itsMe? 'history.snake.paralyze.column.me': 'history.snake.paralyze.column', { column: item.location.id, opponent: opponentName, player: playerName })}</>
}