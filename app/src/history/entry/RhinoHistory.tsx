/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryEntryOptions } from '@gamepark/react-client'
import { PlayerActionHistory, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove, MoveItem, RuleMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getHistoryCard } from '../../material/animal-types'
import { placeStyle, rulesLinkButton } from './ChooseCardHistory'


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
  const opponent = game.players.find((p) => p !== actionPlayer)
  const opponentName = usePlayerName(opponent)
  const itsMe = playerId && actionPlayer === playerId
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itemId = item.id ?? move.reveal?.id
  const card = t(getHistoryCard(itemId))

  if (playerId && opponent === playerId) {
    return (
      <PlayerActionHistory options={options}>
        <Trans css={placeStyle} defaults="history.rhino.move.other.me" values={{ card: card, player: playerName }}>
          <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId})} local/>
        </Trans>
      </PlayerActionHistory>
    )
  }

  return (
    <PlayerActionHistory options={options}>
      <Trans css={placeStyle} defaults={itsMe? 'history.rhino.move.me': 'history.rhino.move'} values={{ card: card, player: playerName, opponent: opponentName }}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId})} local/>
      </Trans>
    </PlayerActionHistory>
  )
}