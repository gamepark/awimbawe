import { css } from '@emotion/react'
import { pointerWithin } from '@dnd-kit/core'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { NewRoundDialog } from './NewRoundDialog'
import { PlayerPanels } from './panels/PlayerPanels'

export const GameDisplay = () => {
  return (
    <>
      <GameTable
        collisionAlgorithm={pointerWithin}
        xMin={-35}
        xMax={60}
        yMin={-24}
        yMax={24}
        margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      >
        <GameTableNavigation css={navigationPosition} scaleStep={0.2} />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)" />}
      </GameTable>
      <PlayerPanels />
      <NewRoundDialog />
    </>
  )
}

const navigationPosition = css`
  position: absolute;
  left: auto;
  right: 2.5em;
  top: 47em;
  height: 14em;
  flex-direction: column;
  > button {
    padding: 0;
    filter: drop-shadow(0.1em 0.1em 0.05em black);
  }
`
