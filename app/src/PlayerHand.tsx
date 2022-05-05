/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isOtherPlayerView, PlayerView } from '@gamepark/awimbawe/GameView'
import { Hand } from '@gamepark/react-components'
import Card from './material/Card'
import { cardHeight, cardWidth, handLeft } from './styles'

type Props = {
    player: PlayerView
    top?: boolean
}

export default function PlayerHand({ player, top }: Props) {

    return (


        <Hand css={[handCss,top ? topCss : bottomCss]} >
            {isOtherPlayerView(player) ?

                [...Array(player.hand)].map((_, index) => <Card key={index} />) :

                player.hand.map(animal => <Card key={animal} animal={animal} />)}

        </Hand>



    )
}






const handCss = css`
  position: absolute;
  
  
  width: ${cardWidth}em;
  height: ${cardHeight}em;
`

const topCss = css`
top: 4em;
right: ${handLeft}em;
transform: scaleY(-1);
`

const bottomCss = css`
bottom: 4em;
left: ${handLeft}em;
`