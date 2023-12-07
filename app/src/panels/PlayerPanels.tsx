/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { getCrowns } from '@gamepark/awimbawe/material/Animal'
import Heir from '@gamepark/awimbawe/material/Heir'
import sumBy from 'lodash/sumBy'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? 1
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<AwimbaweRules>()!

  const getPlayerCrowns = (player: Heir) => {
    if (rules.game.rule?.id === RuleId.PrepareNewRound) return 0
    const cards = rules
      .material(MaterialType.AnimalCard)
      .location((location) => location.type === LocationType.PlayerTrickStack || location.type === LocationType.PlayerHyena)
      .player(player)
      .getItems()

    return sumBy(cards, (card) => getCrowns(card.id))
  }

  return (
    <>
      {players.map((player) => (
        <PlayerPanel key={player.id} playerId={player.id} css={[panelPosition, player.id === playerId? bottomPosition: topPosition ]}>
          <div css={crowns}>{getPlayerCrowns(player.id)}</div>
        </PlayerPanel>
      ))}
    </>
  )
}

const crowns = css`
  font-size: 3em;
`

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 14em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 85em;
`
