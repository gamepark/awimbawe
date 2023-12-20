/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartRule, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const SnakeHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()
  const playerName = usePlayerName(game.rule!.player!)
  const passMove = useLegalMove((move) => isStartRule(move) || isStartPlayerTurn(move))

  if (player && rules?.isTurnToPlay(player)) {
    return (
      <Trans defaults="header.snake.me">
        <PlayMoveButton move={passMove} />
      </Trans>
    )
  } else {
    return <>{t('header.snake', { player: playerName })}</>
  }
}
