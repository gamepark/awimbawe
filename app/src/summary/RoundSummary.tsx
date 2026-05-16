import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe/AwimbaweRules'
import { RoundSummary, WinType } from '@gamepark/awimbawe/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { HTMLAttributes } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Crown from '../images/crown.jpg'

type RoundSummaryProps = {
  summary: RoundSummary
} & HTMLAttributes<HTMLDivElement>

export const RoundSummaryDetail = (props: RoundSummaryProps) => {
  const { summary, ...rest } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<AwimbaweRules>()
  const iWin = playerId && playerId === summary.winner
  const winner = summary?.winner
  const winnerName = usePlayerName(summary?.winner)
  const looser = summary?.winner && rules?.players.find((p) => p !== summary?.winner)
  const looserName = usePlayerName(looser)

  return (
    <div css={summaryContainer} {...rest}>
      {iWin ? (
        <>
          <div css={marginBottom}>{t('round-summary.dialog.win.me')}</div>
          {summary.type === WinType.Hyena && <div css={[alignIconText, italic]}>{t('round-summary.dialog.win.hyena', { looserName: looserName })}</div>}
          {summary.type === WinType.Crowns && (
            <div css={[alignIconText, italic]}>
              <Trans
                i18nKey="round-summary.dialog.win.crowns.me"
                values={{
                  winner: summary.crowns?.[winner!] ?? 0,
                  looser: summary.crowns?.[looser!] ?? 0,
                  looserName: looserName
                }}
              >
                <span css={crownStyle} />
              </Trans>
            </div>
          )}
        </>
      ) : (
        <>
          <div css={marginBottom}>{t('round-summary.dialog.win', { winner: winnerName })}</div>
          {summary.type === WinType.Hyena && !playerId && (
            <div css={[alignIconText, italic]}>{t('round-summary.dialog.win.hyena', { looserName: looserName })}</div>
          )}
          {summary.type === WinType.Hyena && playerId && (
            <div css={[alignIconText, italic]}>
              {t('round-summary.dialog.win.hyena.me.loose', {
                winner: winnerName
              })}
            </div>
          )}
          {summary.type === WinType.Crowns && (
            <div css={[alignIconText, italic]}>
              <Trans
                i18nKey="round-summary.dialog.win.crowns.me.loose"
                values={{
                  winner: summary.crowns?.[winner!] ?? 0,
                  winnerName: winnerName,
                  looser: summary.crowns?.[looser!] ?? 0
                }}
              >
                <span css={crownStyle} />
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

export const alignIconText = css`
  > * {
    vertical-align: top;
  }

  picture,
  img {
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
  display: inline-block;
`
