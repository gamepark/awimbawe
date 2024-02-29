/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe'
import { Memory, RoundSummary } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { RulesDialog, useRules } from '@gamepark/react-game'
import { helpDialogContentCss } from '@gamepark/react-game/dist/components/dialogs/RulesDialog/RulesHelpDialogContent'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Crown from './images/crown.jpg'
import { RoundSummaryDetail } from './summary/RoundSummary'


export const NewRoundDialog:  FC = () => {
  const { t } = useTranslation()
  const rules = useRules<AwimbaweRules>()
  const [opened, setOpened] = useState<boolean>(false)
  const [summary, setSummary] = useState<RoundSummary | undefined>(undefined)
  const summaries = rules?.remind<RoundSummary[]>(Memory.RoundSummary)

  useEffect(() => {
    if (opened || !summaries?.length || !rules) return
    if (rules.game.rule && rules.game.rule.id !== RuleId.PrepareNewRound) return
    setSummary(summaries[summaries.length - 1])
    setOpened(true)
  }, [summaries])

  if (!opened || !summary) return null

  const closeModal = () => {
    setOpened(false)
  }

  return (
    <RulesDialog open close={closeModal}>
      <div css={helpDialogCss}>
        <div css={helpDialogContentCss}>
          <h2>{t('round-summary.dialog.title')}</h2>
          <RoundSummaryDetail summary={summary} />
        </div>
      </div>
    </RulesDialog>
  )

}

const helpDialogCss = css`
  display: flex;
  padding: 3em;
  max-width: inherit;
  max-height: inherit;
  flex-direction: column;
  
  > div > h2 {
    margin-bottom: 0.7em;
  }
`

export const alignIconText = css`
  > * {
    vertical-align: top;
  }

  picture, img {
    vertical-align: top;
    margin-right: 0.1em;
  }
`

export const crownStyle = css`
  flex: 1;
  align-self: center;
  background-image: url(${Crown});
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
