import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const CheetahHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const opponentName = usePlayerName(player ? game.players.find((p) => p !== player) : game.players[0])
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  useEffect(() => {
    setDialogOpen(legalMoves.length > 0)
  }, [legalMoves.length])

  const rules = useRules<MaterialRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = player && player === activePlayer

  if (me) {
    return (
      <>
        <Trans i18nKey="header.cheetah.me">{legalMoves.length > 0 ? <ThemeButton onClick={() => setDialogOpen(true)} /> : <></>}</Trans>
        <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
          <div css={rulesCss}>
            <div css={contentCss}>
              <h2>
                <Trans i18nKey="header.cheetah.me">
                  <span />
                </Trans>
              </h2>
              <div css={buttonsCss}>
                <PlayMoveButton move={legalMoves.find((move) => move.data === player)}>{t('header.cheetah.choose.me')}</PlayMoveButton>
                <PlayMoveButton move={legalMoves.find((move) => move.data !== player)}>
                  {t('header.cheetah.choose.other', { player: opponentName })}
                </PlayMoveButton>
              </div>
            </div>
          </div>
        </RulesDialog>
      </>
    )
  } else {
    return <>{t('header.cheetah', { player: playerName })}</>
  }
}

const rulesCss = css`
  display: flex;
  padding: 3em;
  max-width: inherit;
  max-height: inherit;
`

const contentCss = css`
  margin: 0 0.5em;
  padding: 0 0.5em;
  font-size: 2.4em;
  overflow: auto;
  flex: 1;

  > h2 {
    margin: 0 1.5em 0.8em;
    text-align: center;
    font-family: 'Cinzel', serif;
    color: #242b5d;
  }
`

const buttonsCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.6em;

  > button {
    white-space: break-spaces;
  }
`
