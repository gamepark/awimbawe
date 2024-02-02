import { isHyena } from '@gamepark/awimbawe/material/Animal'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { HistoryEntryOptions } from '@gamepark/react-client/dist/History/HistoryDescription'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves/rules/RuleMove'
import { isStartRule } from '@gamepark/rules-api/dist/material/moves/rules/StartRule'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const getSolveTrickEntry = (move: MaterialMove, game: MaterialGame, options: HistoryEntryOptions) => {

  if (isMoveItemType(MaterialType.AnimalCard)(move) && (move.location.type === LocationType.PlayerTrickStack || move.location.type === LocationType.PlayerHyena)) {
    const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
    if (isHyena(item.id)) {
      return <WinHyenaHistory game={game} move={move} options={options} />
    }
  }

  if (isStartRule(move) && move.id === RuleId.EndOfTurn) {
    return <WinTrickHistory game={game} move={move} options={options} />
  }

  return
}

export type WinTrickHistoryProps = {
  move: RuleMove
  game: MaterialGame
  options: HistoryEntryOptions
}

export const WinTrickHistory: FC<WinTrickHistoryProps> = (props) => {
  const { options } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const lead = options.getGameAfter().memory[Memory.Lead]
  const winnerName = usePlayerName(lead)

  return <>{t(itsMe? 'history.solve.me': 'history.solve', { winner: winnerName })}</>
}

export type WinHyenaHistoryProps = {
  move: MoveItem
  game: MaterialGame
  options: HistoryEntryOptions
}

export const WinHyenaHistory: FC<WinHyenaHistoryProps> = (props) => {
  const { options } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const playerName = usePlayerName(actionPlayer)

  return <>{t(itsMe? 'history.hyena.me': 'history.hyena', { player: playerName })}</>
}