/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe'
import { Memory, RoundSummary } from '@gamepark/awimbawe/rules/Memory'
import { useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import { Trans } from 'react-i18next'
import { RoundSummaryDetail } from '../../summary/RoundSummary'

type RoundSummaryHelpProps = HTMLAttributes<HTMLDivElement>

export const RoundSummaryHelp: FC<RoundSummaryHelpProps>   = (props) => {
  const rules = useRules<AwimbaweRules>()!
  const summaries = rules.remind<RoundSummary[]>(Memory.RoundSummary)!
  if (!summaries?.length) return null;

  return (
    <div {...props}>
      <hr css={separator} />
      {summaries.map((s, index) => (
        <div key={index} css={marginBottom}>
          <div css={roundStyle}><Trans defaults="help.round-summary.round" values={{ round: index + 1}}><strong /></Trans></div>
          <RoundSummaryDetail summary={s}  />
        </div>
      ))}
    </div>
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
export const marginBottom = css`
  margin-bottom: 0.5em;
`