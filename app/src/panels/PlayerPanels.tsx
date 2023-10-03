/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayerId, usePlayers } from '@gamepark/react-game'
import { css } from '@emotion/react'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? 1
  const players = usePlayers({ sortFromMe: true })
  return (
    <>
      {players.map((player) => <PlayerPanel key={player.id} playerId={player.id} css={[panelPosition, player.id === playerId? bottomPosition: topPosition ]}/>)}
    </>
  )
}
const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 14em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 82em;
`