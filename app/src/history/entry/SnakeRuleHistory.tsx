import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MoveComponentProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

export const SnakePassHistory = ({ context }: MoveComponentProps<MaterialMove>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return <>{t(itsMe ? 'history.snake.pass.me' : 'history.snake.pass', { player: name })}</>
}

export const SnakeHistory = ({ move, context }: MoveComponentProps<MoveItem>) => {
  const { game } = context
  const actionPlayer = context.action.playerId as Heir
  const opponent = game.players.find((p: number) => p !== actionPlayer)! as Heir
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]

  if (item.location.type === LocationType.Hand) {
    return <SnakeHandDetail player={actionPlayer} opponent={opponent} />
  }

  return <SnakeColumnDetail player={actionPlayer} opponent={opponent} />
}

type SnakeDetailProps = {
  player: Heir
  opponent: Heir
}

const SnakeColumnDetail = ({ player, opponent }: SnakeDetailProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return <>{t('history.snake.paralize.column.other.me', { player: playerName })}</>
  }

  return <>{t(itsMe ? 'history.snake.paralize.column.me' : 'history.snake.paralize.column', { opponent: opponentName, player: playerName })}</>
}

const SnakeHandDetail = ({ player, opponent }: SnakeDetailProps) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const itsMe = playerId && player === playerId
  const opponentName = usePlayerName(opponent)
  const playerName = usePlayerName(player)

  if (playerId && opponent === playerId) {
    return <>{t('history.snake.paralize.hand.other.me', { player: playerName })}</>
  }

  return <>{t(itsMe ? 'history.snake.paralize.hand.me' : 'history.snake.paralize.hand', { opponent: opponentName, player: playerName })}</>
}
