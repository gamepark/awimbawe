/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { EagleChoice } from '@gamepark/awimbawe/rules/CustomMoveType'
import { PlayMoveButton, RulesDialog, useGame, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const EndOfTurnHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)

  if (player && rules?.isTurnToPlay(player)) {
    return <>
      <Trans defaults="header.eagle.me">
        <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Attack)} />
        <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Runaway)} />
      </Trans>
      <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
        <div css={rulesCss}>
          <h2><Trans defaults="header.eagle.me"><span/></Trans></h2>
          <div>
            <p>
              <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Attack)}>
                {t('header.eagle.attack')}
              </PlayMoveButton>
            </p>
            <p>
              <PlayMoveButton move={legalMoves.find(move => move.data === EagleChoice.Runaway)}>
                {t('header.eagle.runaway')}
              </PlayMoveButton>
            </p>
          </div>
        </div>
      </RulesDialog>
    </>
  } else {
    return <>{t('header.eagle', { player: playerName })}</>
  }
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
