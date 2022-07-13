/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {getCardAnimal, isKnownCard} from '@gamepark/awimbawe/GameView'
import { blockAnimalInPileMove } from '@gamepark/awimbawe/moves/BlockAnimalInPile'
import StockAnimal from '@gamepark/awimbawe/StockAnimal'
// import { getActivePlayer } from '@gamepark/awimbawe/Awimbawe'
// import { otherHeir } from '@gamepark/awimbawe/Heir'
import {usePlay} from '@gamepark/react-client'
import {Draggable} from '@gamepark/react-components'
import AnimalCard from './material/AnimalCard'
import {cardHeight, cardWidth, headerHeight, topPileLeft} from './styles'

type Props = {
    piles: Partial<StockAnimal>[][]
    top?: boolean
    draggable : boolean
}

export default function PlayerPiles({ piles, top, draggable }: Props) {
    const play = usePlay()
    return (
        <>

            {piles.map((pile, pileIndex) =>
                pile.map((card, cardIndex) =>
                        <Draggable css={top ? topCardPositionCss(pileIndex, cardIndex) : bottomCardPositionCss(pileIndex, cardIndex)}
                            key={isKnownCard(card) ? card.animal : pileIndex + "_" + cardIndex}
                            type="animal"
                            item={{ animal: getCardAnimal(card), pileIndex }}
                            canDrag={draggable && !piles[pileIndex][pile.length-1].blocked && cardIndex === pile.length - 1}
                            drop={play}
                            onClick={ () => play(blockAnimalInPileMove(pileIndex))}
                            >
                            
                            <AnimalCard animal={getCardAnimal(card)} />
                        </Draggable>
                )


            )}

        </>
    )
}





const bottomCardPositionCss = (pileIndex: number, cardIndex: number) => css`
    position: absolute;
    top: ${64 + cardIndex * (cardHeight / 3)}em;
    left: ${105 + pileIndex * (cardWidth + 1)}em;


`
const topCardPositionCss = (pileIndex: number, cardIndex: number) => css`
    position: absolute;
    top: ${headerHeight + 1 + cardIndex * (cardHeight / 3)}em;
    left: ${topPileLeft(pileIndex)}em;
    
    // filter: grayscale();
    // transform: translateY(4em);

`


