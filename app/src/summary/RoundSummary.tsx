/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { RoundSummary, WinType } from '@gamepark/awimbawe/rules/Memory'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { FC, HTMLAttributes } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { alignIconText, crownStyle } from '../NewRoundDialog'

type RoundSummaryProps = {
  summary: RoundSummary
} & HTMLAttributes<HTMLDivElement>

export const RoundSummaryDetail: FC<RoundSummaryProps> = (props) => {
  const { summary, ...rest } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<AwimbaweRules>()
  const iWin = playerId && playerId === summary.winner
  const winner = summary?.winner
  const winnerName = usePlayerName(summary?.winner)
  const looser = summary?.winner && rules?.players.find((p) => p !== summary?.winner)
  const looserName = usePlayerName(looser)
  console.log(looserName)
  return (
    <div css={summaryContainer} {...rest}>
    { iWin? (
        <>
          <div css={marginBottom}>{t('round-summary.dialog.win.me')}</div>
          { summary.type === WinType.Hyena && <div css={[alignIconText, italic]}>{t('round-summary.dialog.win.hyena', { looserName: looserName })}</div> }
          { summary.type === WinType.Crowns && (
            <div css={[alignIconText, italic]}>
              <Trans defaults="round-summary.dialog.win.crowns.me" values={{ winner: summary.crowns?.[winner!] ?? 0, looser: summary.crowns?.[looser!] ?? 0, looserName: looserName }}>
                <span css={crownStyle}/>
              </Trans>
            </div>
          )}
        </>
      ): (
        <>
          <div css={marginBottom}>{t('round-summary.dialog.win', { winner: winnerName })}</div>
          { summary.type === WinType.Hyena && !playerId && <div css={[alignIconText, italic]}>{t('round-summary.dialog.win.hyena', { looserName: looserName })}</div> }
          { summary.type === WinType.Hyena && playerId && <div css={[alignIconText, italic]}>{t('round-summary.dialog.win.hyena.me.loose', { winner: winnerName })}</div> }
          { summary.type === WinType.Crowns &&  (
            <div css={[alignIconText, italic]}>

              <Trans defaults="round-summary.dialog.win.crowns.me.loose" values={{ winner: summary.crowns?.[winner!] ?? 0, winnerName: winnerName, looser: summary.crowns?.[looser!] ?? 0 }}>
                <span css={crownStyle}/>
              </Trans>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const italic = css`
  font-style: italic;
  font-size: 0.9em;
`

const summaryContainer = css`
  margin-top: 0.5em;
  padding-bottom: 0.5em;
`

export const marginBottom = css`
  margin-bottom: 0.3em;
`