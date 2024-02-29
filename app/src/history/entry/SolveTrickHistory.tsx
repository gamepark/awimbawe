/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe'
import { isHyena } from '@gamepark/awimbawe/material/Animal'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { HistoryEntry, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartRule, MoveItem } from '@gamepark/rules-api'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'
import { ActionHistory } from './ActionHistory'


export const SolveTrickRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (isMoveItemType(MaterialType.AnimalCard)(move) && (move.location.type === LocationType.PlayerTrickStack || move.location.type === LocationType.PlayerHyena)) {
    const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
    if (isHyena(item.id) && !move.location.rotation) {
      return <WinHyenaHistory game={game} move={move} context={context}/>
    }
  }
  if (isStartRule(move) && move.id === RuleId.EndOfTurn) {
    return <WinTrickHistory game={game} move={move} context={context}/>
  }

  return null
}

export const WinTrickHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = new AwimbaweRules(context.game)
  useEffect(() => {
    rules.play(move)
  }, [])
  const lead = context.game.memory[Memory.Lead]
  const itsMe = playerId && lead === playerId
  const winnerName = usePlayerName(lead)

  return (
    <HistoryEntry border css={winTrick}>
      {t(itsMe ? 'history.solve.me' : 'history.solve', { player: winnerName })}
    </HistoryEntry>
  )

}

type WinHyenaHistoryProps = {
  move: MoveItem
} & Omit<AwimbaweHistoryEntryProps, 'move'>

export const WinHyenaHistory: FC<WinHyenaHistoryProps> = (props) => {
  const { move, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = move.location.player
  const itsMe = playerId && actionPlayer === playerId
  const playerName = usePlayerName(actionPlayer)

  return (
    <ActionHistory consequence context={context}>{t(itsMe ? 'history.hyena.me' : 'history.hyena', { player: playerName })}</ActionHistory>
  )
}

export const winTrick = css`
  color: grey;
  font-style: italic;
  text-align: center
`