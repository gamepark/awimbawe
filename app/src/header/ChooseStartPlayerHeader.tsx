/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { CustomMove, isCustomMove, MaterialGame } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'
import Heir from '@gamepark/awimbawe/material/Heir'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'

export const ChooseStartPlayerHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)

  if (!legalMoves.length) {
    return <>{t('header.choose-start', { player: playerName }) ?? t('Player choosing who starts')}</>
  }

  return (
    <>
      <Trans defaults="header.choose-start.me"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
      <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
        <div css={rulesCss}>
          <h2><Trans defaults="Choose start player"><span/></Trans></h2>
          <p>
            <PlayMoveButton move={legalMoves.find(move => move.data === player)}>
              {t('Choose me as first player')}
            </PlayMoveButton>
          </p>
          {legalMoves.filter(move => move.data !== player).map(move =>
            <p key={move.data}><ChoosePlayerButton move={move}/></p>
          )}
        </div>
      </RulesDialog>
    </>
  )
}

const ChoosePlayerButton = ({ move }: { move: CustomMove }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(move.data)
  return <PlayMoveButton move={move}>{t('Choose {player} as start player', { player: playerName })}</PlayMoveButton>
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
