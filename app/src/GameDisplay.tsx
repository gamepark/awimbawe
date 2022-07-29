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
import { isRhinoceros, isSerpent } from '@gamepark/awimbawe/Animal'



type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<Heir>()
  const bottomPlayerId = playerId ?? Heir.WhiteTiger  // what does mean "??" = fallback (valeur par défaut)
  const topPlayerId = otherHeir(bottomPlayerId)
  const player = playerId? game[playerId]:undefined
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayerDisplay player={game[topPlayerId] } top heir={topPlayerId} isActive={getActivePlayer(game)===topPlayerId} 
      canMovePile={player?.pendingPower && isRhinoceros(player.played!)} canBlock={player?.pendingPower && isSerpent(player.played!)}/>
      //done
      <PlayerDisplay player={game[bottomPlayerId]} heir={bottomPlayerId} isActive={getActivePlayer(game)===bottomPlayerId}/> 

      <PlayArea bottomAnimal={game[bottomPlayerId].played} topAnimal={game[topPlayerId].played}/>
      {playerId && <PlayDropArea playerId={playerId} game={game}/>}
      

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

