/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'

export const ChooseStartPlayerHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const otherName = usePlayerName(player? game.players.find((p) => p !== player): game.players[0])
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)

  if (player && rules?.isTurnToPlay(player)) {
    const chooseOther = legalMoves.find(move => move.data !== player)!
    return (
      <>
        <Trans defaults="header.choose-start.me"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
        <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
          <div css={rulesCss}>
            <h2><Trans defaults="header.choose-start.me"><span/></Trans></h2>
            <div>
              <p>
                <PlayMoveButton move={legalMoves.find(move => move.data === player)}>
                  {t('header.choose-start.choose.me')}
                </PlayMoveButton>
              </p>
              <p>
                <PlayMoveButton move={chooseOther}>
                  {t('header.choose-start.choose.other', { player: otherName })}
                </PlayMoveButton>
              </p>
            </div>
          </div>
        </RulesDialog>
      </>
    )
  } else {
    return <>{t('header.choose-start', { player: playerName }) ?? t('Player choosing who starts')}</>
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
