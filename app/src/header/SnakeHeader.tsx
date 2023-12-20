/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { PlayMoveButton, useGame, useLegalMove, useLegalMoves, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartRule, MaterialGame } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const SnakeHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const playerName = usePlayerName(game.rule!.player!)
  const passMove = useLegalMove((move) => isStartRule(move) || isStartPlayerTurn(move))
  const legalMoves = useLegalMoves()
  const me = player && legalMoves.length

  if (me) {
    return (
      <Trans defaults="header.snake.me">
        <PlayMoveButton move={passMove} />
      </Trans>
    )
  } else {
    return <>{t('header.snake', { player: playerName })}</>
  }
}
