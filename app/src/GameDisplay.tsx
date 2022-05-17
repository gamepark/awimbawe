/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import GameView from '@gamepark/awimbawe/GameView'
import Heir, { otherHeir } from '@gamepark/awimbawe/Heir'
import { usePlayerId } from '@gamepark/react-client'
import { Letterbox } from '@gamepark/react-components'
import PlayerDisplay from './PlayerDisplay'
import HeirCard from './material/HeirCard'


type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<Heir>()
  const bottomPlayerId = playerId ?? Heir.WhiteTiger
  const topPlayerId = otherHeir(bottomPlayerId)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayerDisplay player={game[topPlayerId ] } top={true} heir={topPlayerId}/>
      <HeirCard css={topPlayerHeir} heir={Heir.BlackPanther} flipped/>
      <div css={sampleCss}>
        {/* {JSON.stringify(game)} */}
      </div>
      <HeirCard css={bottomPlayerHeir} heir={Heir.WhiteTiger} flipped/>       
      <PlayerDisplay player={game[bottomPlayerId]} heir={bottomPlayerId}/>
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

const bottomPlayerHeir = css`
  bottom: 22em;
  left: 1.5em;
`

const topPlayerHeir = css`
  top: 22em;
  right: 1.5em;
  transform: rotateX(180deg)
`