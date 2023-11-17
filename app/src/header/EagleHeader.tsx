/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { EagleChoice } from '@gamepark/awimbawe/rules/CustomMoveType'

export const EagleHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)

  if (!legalMoves.length) {
    return <>{t('Player chose action for eagle', { player: playerName })}</>
  }

  const close = () => setDialogOpen(false)
  
  return (
    <>
      <Trans defaults="Choose action for the eagle"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
      <RulesDialog open={dialogOpen} close={close}>
        <div css={rulesCss}>
          <h2><Trans defaults="Choose action for the eagle"><span/></Trans></h2>
          <p>
            <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Runaway)} onPlay={close}>
              {t('Runaway')}
            </PlayMoveButton>
          </p>
          <p>
            <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Attack)} onPlay={close}>
              {t('Attack')}
            </PlayMoveButton>
          </p>
        </div>
      </RulesDialog>
    </>
  )
}

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
