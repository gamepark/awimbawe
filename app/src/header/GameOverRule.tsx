/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe'
import Heir from '@gamepark/awimbawe/material/Heir'
import { Memory, RoundSummary } from '@gamepark/awimbawe/rules/Memory'
import { Avatar, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import partition from 'lodash/partition'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RoundSummaryHelp } from '../material/help/RoundSummaryHelp'

export const GameOverRule = () => {
  const { t } = useTranslation()
  const rules = useRules<AwimbaweRules>()!
  const playerId = usePlayerId()
  const summaries = rules.remind<RoundSummary[]>(Memory.RoundSummary)
  const winner = useMemo(() => {
    const [panther, tiger] = partition(summaries, (s) => s.winner == Heir.BlackPanther)
    return panther.length > tiger.length? Heir.BlackPanther: Heir.WhiteTiger
  }, [summaries])

  const iWin = playerId && playerId === winner
  const winnerName = usePlayerName(winner)

  return (
    <div css={rulesCss}>
      <h2>{t('rules.end')}</h2>
      <div css={winnerContainer}>
        <div css={avatarContainer}><Avatar playerId={winner} css={avatarStyle} /></div>
        <div css={winnerText}>{t(iWin? 'rules.end.win.me': 'rules.end.win', { player: winnerName } )}</div>
      </div>
      <RoundSummaryHelp css={smaller} />
    </div>
  )
}

const avatarContainer = css`
  width: 2em;
  height: 2em;
  padding-right: 2.5em;
`

const avatarStyle = css`
  //flex: 1;
  position: absolute;
  width: 2em;
  height: 2em;
`

const winnerText = css`
  flex: 6;
`

const winnerContainer = css`
  display: flex;
  align-items: center;
`

const smaller = css`
  font-size: 0.8em;
`


const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`