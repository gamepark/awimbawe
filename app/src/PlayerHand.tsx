/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isOtherPlayerView, PlayerView } from '@gamepark/awimbawe/GameView'
import { usePlay } from '@gamepark/react-client'
import { Hand } from '@gamepark/react-components'
import AnimalCard from './material/AnimalCard'
import { cardHeight, cardWidth, handLeft } from './styles'

type Props = {
    player: PlayerView
    top?: boolean
    canDrag: boolean
}

export default function PlayerHand({ player, top, canDrag }: Props) {
    const play = usePlay()
    return (

        // TODO gestion de cartes jouées
        <Hand getItemProps={index => ({
            drag: {
                type: "animal",
                item: {animal: !isOtherPlayerView(player) && player.hand[index] },
                canDrag,
                drop: play
            }
        })} css={[handCss,top ? topCss : bottomCss]} >
            {isOtherPlayerView(player) ?

                [...Array(player.hand)].map((_, index) => <AnimalCard key={index} />) :

                player.hand.map(animal => <AnimalCard key={animal} animal={animal} />)}

        </Hand>



    )
}






const handCss = css`
  position: absolute;
  width: ${cardWidth}em;
  height: ${cardHeight}em;
`

const topCss = css`
top: 16em;
right: ${handLeft}em;
transform: scaleY(-1);
`

const bottomCss = css`
bottom: 10em;
left: ${handLeft}em;
`