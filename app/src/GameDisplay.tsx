/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { NewRoundDialog } from './NewRoundDialog'
import {css} from "@emotion/react";

export const GameDisplay = () => {
  return <>
    <GameTable
      collisionAlgorithm={pointerWithin} 
      xMin={-35}
      xMax={60} 
      yMin={-24}
      yMax={24} margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      css={css`background-color: rgba(255, 255, 255, 0.47)`}
    >
      <GameTableNavigation css={navigationPosition} />
    </GameTable>
    <PlayerPanels/>
    <NewRoundDialog />
  </>
}

const navigationPosition = css`
  position: absolute;
  left: auto;
  right: 2.5em;
  top: 47em;
  height: 14em;
  flex-direction: column;
  > button {
    filter: drop-shadow(0.1em 0.1em 0.05em black);
  }
`
