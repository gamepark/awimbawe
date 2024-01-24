/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { Memory, RoundSummary } from '@gamepark/awimbawe/rules/Memory'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { RoundSummaryDetail } from '../../summary/RoundSummary'

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
      <RoundSummaryHelp { ...props } />
    </div>
  )
}

export const RoundSummaryHelp: FC<MaterialHelpProps> = () => {
  const rules = useRules<AwimbaweRules>()!
  const summaries = rules.remind<RoundSummary[]>(Memory.RoundSummary)!
  if (!summaries?.length) return null;

  return (
    <>
      <hr css={separator} />
      {summaries.map((s, index) => (
        <div key={index} css={marginBottom}>
          <div css={roundStyle}><Trans defaults="help.round-summary.round" values={{ round: index + 1}}><strong /></Trans></div>
          <RoundSummaryDetail summary={s}  />
        </div>
      ))}
    </>
  )

}

export const roundStyle = css`
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 0.5em;
`

export const separator = css`
  margin-top: 1em;
  margin-bottom: 1em;
`

export const italic = css`
  font-style: italic;
`
export const marginBottom = css`
  margin-bottom: 0.5em;
`
