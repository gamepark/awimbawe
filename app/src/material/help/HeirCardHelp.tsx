/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { RoundSummaryHelp } from './RoundSummaryHelp'

export const HeirCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const hasWinARound = item.location?.rotation
  const playerName = usePlayerName(item.id)
  const playerId = usePlayerId()

  return (
    <div css={marginBottom}>
      <h2>{t(`help.heir.title`, { type: t(`player.${item.id}`)})}</h2>
      <p>{ t(playerId === item.id? `help.heir.own.me`: 'help.heir.own', { player: playerName }) }</p>
      { hasWinARound && (
        <div css={italic}>{t(playerId === item.id? `help.heir.win-round.me`: 'help.heir.win-round',  { player: playerName })}</div>
      ) }
      <RoundSummaryHelp />
    </div>
  )
}

export const italic = css`
  font-style: italic;
`
export const marginBottom = css`
  margin-bottom: 0.5em;
`
