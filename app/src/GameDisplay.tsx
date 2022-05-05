/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import Animal from '@gamepark/awimbawe/Animal'
import GameView from '@gamepark/awimbawe/GameView'
import Heir, { otherHeir } from '@gamepark/awimbawe/Heir'
import { usePlayerId } from '@gamepark/react-client'
import { Letterbox } from '@gamepark/react-components'
import Card from './material/Card'
import PlayerDisplay from './PlayerDisplay'


type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<Heir>()
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayerDisplay player={game[otherHeir(playerId ?? Heir.WhiteTiger) ] } top={true}/>
      <Card css={topPlayerHeir} animal={Animal.DesertElephant}/>
      <div css={sampleCss}>
        {/* {JSON.stringify(game)} */}
      </div>
      <Card css={bottomPlayerHeir} animal={Animal.GrasslandCheetah}/>          
      <PlayerDisplay player={game[playerId ?? Heir.WhiteTiger]}/>
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
  bottom: 5em;
  left: 5em;
`

const topPlayerHeir = css`
  top: 5em;
  right: 5em;
`