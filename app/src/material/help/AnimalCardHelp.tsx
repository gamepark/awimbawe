/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal, { getCrowns } from '@gamepark/awimbawe/material/Animal'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import range from 'lodash/range'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Crown from '../../images/crown.jpg'
import MinusCrown from '../../images/minus-crown.jpg'
import {isMoveItemType} from "@gamepark/rules-api";
import {MaterialItem} from "@gamepark/rules-api";

export const AnimalCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const title = item.id ? getAnimalTitle(item.id) : 'help.card'
  const crowns = item.id? getCrowns(item.id): 0
  const absCrowns = Math.abs(crowns)
  return (
    <>
      <h2>{t(title)}</h2>
      <LocationHelp {...props} />
      <p>
        {!!item.id && (
          <Trans defaults={getAnimalDescription(item.id)}>
            <strong/>
          </Trans>
        )}
      </p>
      {
        !!crowns && (
          <>
            <hr />
            <p css={alignIconText}>
              {t('help.crown')}
              {range(absCrowns).map((index: number) => {
                return <span key={index} css={crownStyle(crowns < 0? MinusCrown: Crown)}/>
              })}
            </p>
          </>
        )
      }
      <Actions {...props} />
      { item?.location?.rotation?.z === 1 && (
        <>
          <p css={[italic, red]}>
            {t('help.card.blocked')}
          </p>
        </>
      )}
    </>
  )
}

const Actions: FC<MaterialHelpProps> = (props) => {
  const { itemIndex, closeDialog} = props;
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(move) && move.itemIndex === itemIndex)
  if (!move) return null

  if (move.location?.rotation?.z) {
    return (
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('help.card.move.block')}
      </PlayMoveButton>
    )
  }

  if (move.location?.type === LocationType.PlayArea) {
    return (
      <PlayMoveButton move={move} onPlay={closeDialog}>
        {t('help.card.move.play')}
      </PlayMoveButton>
    )
  }

  return null
}

const LocationHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const player = usePlayerId()
  const playerName = usePlayerName(item?.location?.player ?? '')
  const locationText = getLocationText(item, player && player === item.location?.player)

  return (
    <p css={italic}>
      {t(locationText, { player: playerName })}
    </p>
  )
}

const getLocationText = (item: Partial<MaterialItem>, me: boolean) => {
  switch (item.location?.type) {
    case LocationType.Hand:
      return me? 'help.card.location.hand.me': 'help.card.location.hand'
    case LocationType.Deck:
      return 'help.card.location.deck'
    case LocationType.PlayArea:
      return me? 'help.card.location.play-area.me': 'help.card.location.play-area'
    case LocationType.PlayerTrickStack:
      return me? 'help.card.location.trick.me': 'help.card.location.trick'
    case LocationType.PlayerColumns:
      return me? 'help.card.location.columns.me': 'help.card.location.columns'
    case LocationType.PlayerHyena:
      return me? 'help.card.location.hyena.me': 'help.card.location.hyena'
  }

  return ''
}

const getAnimalTitle = (animal: Animal) => {
  if (animal <= 10) return 'help.card.eagle.title'
  switch (animal % 10) {
    case 1:
      return 'help.card.mouse.title'
    case 2:
      return 'help.card.rhino.title'
    case 3:
      return 'help.card.cheetah.title'
    case 4:
      return 'help.card.hyena.title'
    case 5:
      return 'help.card.snake.title'
    case 6:
      return 'help.card.elephant.title'
  }

  return ''
}

const getAnimalDescription = (animal: Animal) => {
  if (animal <= 10) return 'help.card.eagle'
  switch (animal % 10) {
    case 1:
      return 'help.card.mouse'
    case 2:
      return 'help.card.rhino'
    case 3:
      return 'help.card.cheetah'
    case 4:
      return 'help.card.hyena'
    case 5:
      return 'help.card.snake'
    case 6:
      return 'help.card.elephant'
  }

  return ''
}

export const alignIconText = css`
  > * {
    vertical-align: top;
  }

  picture, img {
    vertical-align: top;
    margin-right: 0.1em;
  }
`

export const crownStyle = (image: string) => css`
  flex: 1;
  align-self: center;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 0.05em solid black;
  border-radius: 0.2em;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.2em;
  box-shadow: 0.1em 0.1em 0.2em gray;
  display:inline-block;
`

const italic = css`
  font-style: italic;
  font-size: 0.9em;
`

const red = css`
  color: red;
`
