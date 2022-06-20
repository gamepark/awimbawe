/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {getCardAnimal, PlayerView} from '@gamepark/awimbawe/GameView'
import {usePlay} from '@gamepark/react-client'
import {Hand} from '@gamepark/react-components'
import AnimalCard from './material/AnimalCard'
import {cardHeight, cardWidth, handLeft} from './styles'

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
                item: {animal: getCardAnimal(player.hand[index]) },
                canDrag,
                drop: play
            }
        })} css={[handCss,top ? topCss : bottomCss]} >
          {player.hand.map((card, index) => <AnimalCard key={getCardAnimal(card) ?? index} animal={getCardAnimal(card)} />)}
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