/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { NewRoundDialog } from './NewRoundDialog'
//import {css} from "@emotion/react";

export const GameDisplay = () => {
  return <>
    <GameTable
      collisionAlgorithm={pointerWithin} 
      xMin={-35}
      xMax={60} 
      yMin={-24}
      yMax={24} margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      //css={css`background-color: rgba(255, 255, 255, 0.47)`}
      />
    <PlayerPanels/>
    <NewRoundDialog />
  </>
}
