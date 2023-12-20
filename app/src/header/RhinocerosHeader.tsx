/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartRule, MaterialGame, MaterialRules } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const RhinocerosHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Heir, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const playerName = usePlayerName(game.rule!.player!)
  const passMove = useLegalMove((move) => isStartRule(move) || isStartPlayerTurn(move))
  const rules = useRules<MaterialRules>()!
  const activePlayer = rules.getActivePlayer()
  const me = player && player === activePlayer

  if (me) {
    return (
      <Trans defaults="header.rhinoceros.me">
        <PlayMoveButton move={passMove} />
      </Trans>
    )
  } else {
    return <>{t('header.rhinoceros', { player: playerName })}</>
  }
}
