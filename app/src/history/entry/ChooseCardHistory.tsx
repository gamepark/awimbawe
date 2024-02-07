/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getAnimalPower } from '@gamepark/awimbawe/material/Animal'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { linkButtonCss, PlayerHistoryEntry, PlayMoveButton, useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, MaterialGame, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getAnimalColor, getHistoryCard } from '../../material/animal-types'
import { AwimbaweHistoryEntryProps } from '../AwimbaweHistory'


export const ChooseCardRuleHistory: FC<AwimbaweHistoryEntryProps> = (props) => {
  const { game, move, context } = props
  if (!isMoveItemType(MaterialType.AnimalCard)(move) || context.consequenceIndex !== undefined) return null

  return <PlayerChooseCardHistory game={game} move={move} context={context} />
}

export type ChooseCardHistoryProps = {
  game: MaterialGame
  move: MoveItem
} & Omit<AwimbaweHistoryEntryProps, 'move'>

export const PlayerChooseCardHistory: FC<ChooseCardHistoryProps> = (props) => {
  const { move, game, context } = props
  const currentGame = useGame<MaterialGame>()!
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itsMe = playerId && actionPlayer === playerId
  const itemId = item.id ?? move.reveal?.id
  const lastRound = currentGame.memory[Memory.Round]

  if (currentGame.rule !== undefined && lastRound && lastRound <= game.memory[Memory.Round]) {
    return (
      <PlayerHistoryEntry border context={context}>
        {t(itsMe? 'history.place.hidden.me': 'history.place.hidden', { card: t(getHistoryCard(itemId)), player: playerName })}
      </PlayerHistoryEntry>
    )
  }

  return (
    <PlayerHistoryEntry border context={context}>
      <Trans css={placeStyle} defaults={itsMe? 'history.place.me': 'history.place'} values={{ card: t(getHistoryCard(itemId), { color: t(getAnimalColor(itemId))}), player: playerName, value: getAnimalPower(itemId) }}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local/>
      </Trans>
    </PlayerHistoryEntry>
  )
}
export const rulesLinkButton = [linkButtonCss, css`
  color: inherit;
  background-color: transparent;
  font-style: italic;
`]

export const placeStyle = css`
  text-transform: capitalize;
  flex: 1;
`