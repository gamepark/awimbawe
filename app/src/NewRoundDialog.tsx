/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from 'react'
import { RulesDialog, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import Heir from '@gamepark/awimbawe/material/Heir'
import { getPlayerCrowns } from '@gamepark/awimbawe/rules/GetCrowns'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { helpDialogContentCss } from '@gamepark/react-game/dist/components/dialogs/RulesDialog/RulesHelpDialogContent'
import { css } from '@emotion/react'


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
    console.log(rules.game.rule?.id, getPlayerCrowns(rules, Heir.BlackPanther),  getPlayerCrowns(rules, Heir.WhiteTiger))
    setCrowns({
      [Heir.BlackPanther]: getPlayerCrowns(rules, Heir.BlackPanther),
      [Heir.WhiteTiger]: getPlayerCrowns(rules, Heir.WhiteTiger),
    })

    setOpened(true)
  }, [w])
  if (!opened) return null

  const iWin = playerId && playerId === winner

  return (
    <RulesDialog open close={() => setOpened(false)}>
      <div css={helpDialogCss}>
        <div css={helpDialogContentCss}>
          <h2>{t('round-summary.dialog.title')}</h2>
          { iWin? (
            <>
              <p>{t('round-summary.dialog.win.me')}</p>
              { hasWinByHyenas && <p>{t('round-summary.dialog.win.hyena', { looser: looserName })}</p> }
              { !hasWinByHyenas && <p>{t('round-summary.dialog.win.crowns.me', { winner: crowns[winner!] ?? 0, looser: crowns[looser!] ?? 0, looserName: looserName })} </p>}
            </>
          ): (
            <>
              <p>{t('round-summary.dialog.win', { winner: winnerName })}</p>
              { hasWinByHyenas && !playerId && <p>{t('round-summary.dialog.win.hyena', { winner: winnerName })}</p> }
              { hasWinByHyenas && playerId && <p>{t('round-summary.dialog.win.hyena.me.loose', { winner: winnerName })}</p> }
              { !hasWinByHyenas && <p>{t('round-summary.dialog.win.crowns', { winner: crowns[winner!] ?? 0, winnerName: winnerName, looser: crowns[looser!] ?? 0, looserName: looserName })} </p>}
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
