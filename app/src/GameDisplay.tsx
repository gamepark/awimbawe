/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import GameView from '@gamepark/awimbawe/GameView'
import Heir, { otherHeir } from '@gamepark/awimbawe/Heir'
import { usePlayerId } from '@gamepark/react-client'
import { Letterbox } from '@gamepark/react-components'
import PlayerDisplay from './PlayerDisplay'
import PlayDropArea from './PlayDropArea'
import PlayArea from './PlayArea'
import { getActivePlayer } from '@gamepark/awimbawe/Awimbawe'



type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<Heir>()
  const bottomPlayerId = playerId ?? Heir.WhiteTiger  // what does mean "??" = fallback (valeur par défaut)
  const topPlayerId = otherHeir(bottomPlayerId)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayerDisplay player={game[topPlayerId] } top heir={topPlayerId}/>

      <div css={sampleCss}>
        {/* {JSON.stringify(game)} */}
      </div>
        
      <PlayerDisplay player={game[bottomPlayerId]} heir={bottomPlayerId} canPlay={getActivePlayer(game)===bottomPlayerId}/> 

      <PlayArea bottomAnimal={game[bottomPlayerId].played} topAnimal={game[topPlayerId].played}/>
      {playerId && <PlayDropArea playerId={playerId}/>}
      

    </Letterbox>
  )
}




const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
  border: 2px solid #fff
`

const sampleCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background-color: black;
  padding: 0.5em;
  border-radius: 1em;
`

