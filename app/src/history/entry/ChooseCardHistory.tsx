/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getAnimalPower } from '@gamepark/awimbawe/material/Animal'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { HistoryEntryOptions } from '@gamepark/react-client'
import { linkButtonCss, PlayMoveButton, usePlayerId, usePlayerName, PlayerActionHistory, useGame } from '@gamepark/react-game'
import { displayMaterialHelp, isMoveItemType, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getAnimalColor, getHistoryCard } from '../../material/animal-types'


export const getChooseCardEntry = (move: MaterialMove, game: MaterialGame, options: HistoryEntryOptions) => {
  if (!isMoveItemType(MaterialType.AnimalCard)(move) || options.consequenceIndex !== undefined) return undefined

  return <ChooseCardHistory game={game} move={move} options={options} />
}

export type ChooseCardHistoryProps = {
  move: MoveItem
  game: MaterialGame
  options: HistoryEntryOptions
}

export const ChooseCardHistory: FC<ChooseCardHistoryProps> = (props) => {
  const { move, game, options } = props
  const currentGame = useGame<MaterialGame>()!
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = options.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itsMe = playerId && actionPlayer === playerId
  const itemId = item.id ?? move.reveal!.id
  const lastRound = currentGame.memory[Memory.Round]

  if (lastRound && lastRound === game.memory[Memory.Round]) {
    return (
      <PlayerActionHistory options={options}>
        {t(itsMe? 'history.place.hidden.me': 'history.place.hidden', { card: t(getHistoryCard(itemId)), player: playerName })}
      </PlayerActionHistory>
    )
  }

  return (
    <PlayerActionHistory options={options}>
      <Trans css={placeStyle} defaults={itsMe? 'history.place.me': 'history.place'} values={{ card: t(getHistoryCard(itemId), { color: t(getAnimalColor(itemId))}), player: playerName, value: getAnimalPower(itemId) }}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: item.id ?? move.reveal?.id})} local/>
      </Trans>
    </PlayerActionHistory>
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