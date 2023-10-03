/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { pointerWithin } from '@dnd-kit/core'
import { PlayerPanels } from './panels/PlayerPanels'

export const GameDisplay = () => {
  return <>
    <GameTable
      collisionAlgorithm={pointerWithin} 
      xMin={-45} 
      xMax={60} 
      yMin={-25}
      yMax={29} margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={css`background-color: rgba(255, 255, 255, 0.47)`}
      />
    <PlayerPanels/>
  </>
}
