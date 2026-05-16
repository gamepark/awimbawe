import { css } from '@emotion/react'
import { getAnimalPower } from '@gamepark/awimbawe/material/Animal'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { linkButtonCss, MoveComponentProps, PlayMoveButton, useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { getAnimalColor, getHistoryCard } from '../../material/animal-types'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlayerChooseCardHistory = ({ move, context }: MoveComponentProps<MoveItem>) => {
  const { game } = context
  const currentGame = useGame<MaterialGame>()!
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itsMe = playerId && actionPlayer === playerId
  const itemId = (move.reveal?.id ?? item.id) as number
  const lastRound = currentGame.memory[Memory.Round]

  if (currentGame.rule !== undefined && lastRound && lastRound <= game.memory[Memory.Round]) {
    return <>{t(itsMe ? 'history.place.hidden.me' : 'history.place.hidden', { card: t(getHistoryCard(itemId)), player: playerName })}</>
  }

  return (
    <Trans
      css={placeStyle}
      i18nKey={itsMe ? 'history.place.me' : 'history.place'}
      values={{
        card: t(getHistoryCard(itemId), { color: t(getAnimalColor(itemId)) }),
        player: playerName,
        value: getAnimalPower(itemId)
      }}
    >
      <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local />
    </Trans>
  )
}

export const rulesLinkButton = [
  linkButtonCss,
  css`
    color: inherit;
    background-color: transparent;
    font-style: italic;
  `
]

export const placeStyle = css`
  text-transform: capitalize;
  flex: 1;
`
