/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryEntryOptions } from '@gamepark/react-client'
import { PlayerActionHistory, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export type RhinoHistoryProps = {
  move: MoveItem
  game: MaterialGame
  options: HistoryEntryOptions
}

export const getRhinoEntry = (move: MaterialMove, game: MaterialGame, options: HistoryEntryOptions) => {
  if (isMoveItemType(MaterialType.AnimalCard)(move)) {
    return <RhinoHistory game={game} move={move} options={options} />
  }

  if (options.consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
    return <RhinoPassHistory game={game} move={move} options={options} />
  }

  return
}

export type RhinoPassHistoryProps = {
  move: RuleMove
  game: MaterialGame
  options: HistoryEntryOptions
}

export const RhinoPassHistory: FC<RhinoPassHistoryProps> = (props) => {
  const { options } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return (
    <PlayerActionHistory options={options}>
      <>{t(itsMe? 'history.rhino.pass.me': 'history.rhino.pass', { player: name })}</>
    </PlayerActionHistory>
  )
}

export const RhinoHistory: FC<RhinoHistoryProps> = (props) => {
  const { move, game, options } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const opponentName = usePlayerName(game.players.filter((p) => p !== actionPlayer))
  const itsMe = playerId && actionPlayer === playerId

  return (
    <PlayerActionHistory options={options}>
      <>{t(itsMe? 'history.rhino.move.me': 'history.rhino.move', { column: move.location.id, opponent: opponentName, player: playerName })}</>
    </PlayerActionHistory>
  )
}