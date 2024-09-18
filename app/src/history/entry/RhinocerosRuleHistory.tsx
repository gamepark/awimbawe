/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryEntry, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getHistoryCard } from '../../material/animal-types'
import { playerColor } from '../../panels/PlayerPanels'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'
import { placeStyle, rulesLinkButton } from './ChooseCardHistory'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const RhinocerosRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { move, game, context } = props
  if (isMoveItemType(MaterialType.AnimalCard)(move)) {
    return <RhinocerosHistory game={game} move={move} context={context}/>
  }

  if (context.consequenceIndex === undefined && (isStartRule(move) || isStartPlayerTurn(move))) {
    return <RhinoPassHistory game={game} context={context}/>
  }

  return null
}

export type RhinocerosHistoryProps = {
  game: MaterialGame
  move?: MoveItem
} & Omit<AwimbaweHistoryEntryProps, 'move'>

export const RhinoPassHistory: FC<RhinocerosHistoryProps> = (props) => {
  const { context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return (
    <HistoryEntry player={actionPlayer} backgroundColor={playerColor[actionPlayer] + '20'}>
      <>{t(itsMe ? 'history.rhino.pass.me' : 'history.rhino.pass', { player: name })}</>
    </HistoryEntry>
  )
}

export const RhinocerosHistory: FC<RhinocerosHistoryProps> = (props) => {
  const { move, game, context } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const opponent = game.players.find((p) => p !== actionPlayer)
  const opponentName = usePlayerName(opponent)
  const itsMe = playerId && actionPlayer === playerId
  const item = game.items[MaterialType.AnimalCard]![move!.itemIndex]
  const itemId = move!.reveal?.id ?? item.id
  const card = t(getHistoryCard(itemId))

  if (playerId && opponent === playerId) {
    return (
      <HistoryEntry depth={1} backgroundColor={playerColor[actionPlayer] + '20'}>
        <Trans css={placeStyle} defaults="history.rhino.move.other.me" values={{ card: card, player: playerName }}>
          <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local/>
        </Trans>
      </HistoryEntry>
    )
  }

  return (
    <HistoryEntry depth={1} backgroundColor={playerColor[actionPlayer] + '20'}>
      <Trans css={placeStyle} defaults={itsMe ? 'history.rhino.move.me' : 'history.rhino.move'}
             values={{ card: card, player: playerName, opponent: opponentName }}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local/>
      </Trans>
    </HistoryEntry>
  )
}