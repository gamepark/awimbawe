import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { EagleChoice } from '@gamepark/awimbawe/rules/CustomMoveType'
import { PlayMoveButton, RulesDialog, useGame, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const EagleHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  const rules = useRules<MaterialRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = player && player === activePlayer

  if (me) {
    return (
      <>
        <Trans i18nKey="header.eagle.me">
          <PlayMoveButton move={legalMoves.find((move) => move.data === EagleChoice.Attack)} />
          <PlayMoveButton move={legalMoves.find((move) => move.data === EagleChoice.Runaway)} />
        </Trans>
        <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
          <div css={rulesCss}>
            <div css={contentCss}>
              <h2>
                <Trans i18nKey="header.eagle.me">
                  <span />
                </Trans>
              </h2>
              <div css={buttonsCss}>
                <PlayMoveButton move={legalMoves.find((move) => move.data === EagleChoice.Attack)}>{t('header.eagle.attack')}</PlayMoveButton>
                <PlayMoveButton move={legalMoves.find((move) => move.data === EagleChoice.Runaway)}>{t('header.eagle.runaway')}</PlayMoveButton>
              </div>
            </div>
          </div>
        </RulesDialog>
      </>
    )
  } else {
    return <>{t('header.eagle', { player: playerName })}</>
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
