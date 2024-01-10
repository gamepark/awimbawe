/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RulesDialog, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { helpDialogContentCss } from '@gamepark/react-game/dist/components/dialogs/RulesDialog/RulesHelpDialogContent'
import { FC, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Crown from './images/crown.jpg'


export const NewRoundDialog:  FC = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<AwimbaweRules>()
  const [opened, setOpened] = useState<boolean>(false)
  const [winner, setWinner] = useState<Heir | undefined>()
  const [hasWinByHyenas, setWinByHyenas] = useState<boolean>(false)
  const [crowns, setCrowns] = useState<Record<Heir, number>>({
    [Heir.BlackPanther]: 0,
    [Heir.WhiteTiger]: 0
  })
  const winnerName = usePlayerName(winner)
  const looser = rules?.players.find((p) => p !== winner)
  const looserName = usePlayerName(looser)
  const w = rules?.remind(Memory.Winner)
  useEffect(() => {
    if (opened || !w || !rules) return
    setWinner(w)
    const hyenas = rules
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerHyena)
      .player((player) => player !== w)
      .length

    setWinByHyenas(hyenas === 4)
    setCrowns({
      [Heir.BlackPanther]: rules.getPlayerCrowns(Heir.BlackPanther),
      [Heir.WhiteTiger]: rules.getPlayerCrowns(Heir.WhiteTiger)
    })

    setOpened(true)
  }, [w])
  if (!opened) return null

  const iWin = playerId && playerId === winner

  const closeModal = () => {
    setWinner(undefined)
    setWinByHyenas(false)
    setCrowns({
      [Heir.BlackPanther]: 0,
      [Heir.WhiteTiger]: 0
    })
    setOpened(false)
  }

  return (
    <RulesDialog open close={closeModal}>
      <div css={helpDialogCss}>
        <div css={helpDialogContentCss}>
          <h2>{t('round-summary.dialog.title')}</h2>
          { iWin? (
            <>
              <p>{t('round-summary.dialog.win.me')}</p>
              { hasWinByHyenas && <p>{t('round-summary.dialog.win.hyena', { looser: looserName })}</p> }
              { !hasWinByHyenas && (
                <p css={alignIconText}>
                  <Trans defaults="round-summary.dialog.win.crowns.me" values={{ winner: crowns[winner!] ?? 0, looser: crowns[looser!] ?? 0, looserName: looserName }}>
                    <span css={crownStyle}/>
                  </Trans>
                </p>
              )}
            </>
          ): (
            <>
              <p>{t('round-summary.dialog.win', { winner: winnerName })}</p>
              { hasWinByHyenas && !playerId && <p>{t('round-summary.dialog.win.hyena', { winner: winnerName })}</p> }
              { hasWinByHyenas && playerId && <p>{t('round-summary.dialog.win.hyena.me.loose', { winner: winnerName })}</p> }
              { !hasWinByHyenas && (
                <p css={alignIconText}>

                  <Trans defaults="round-summary.dialog.win.crowns" values={{ winner: crowns[winner!] ?? 0, winnerName: winnerName, looser: crowns[looser!] ?? 0, looserName: looserName }}>
                    <span css={crownStyle}/>
                  </Trans>
                </p>
              )}
            </>
          )}
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
