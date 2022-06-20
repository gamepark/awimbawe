/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/awimbawe/Animal'
// import { getActivePlayer } from '@gamepark/awimbawe/Awimbawe'
// import { otherHeir } from '@gamepark/awimbawe/Heir'
import { usePlay } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import AnimalCard from './material/AnimalCard'
import { cardHeight, cardWidth, headerHeight, topPileLeft } from './styles'

type Props = {
    piles: (Animal | null)[][]
    top?: boolean
    draggable : boolean
}

export default function PlayerPiles({ piles, top, draggable }: Props) {
    const play = usePlay()
    return (
        <>

            {piles.map((pile, pileIndex) =>
                pile.map((animal, cardIndex) =>
                        <Draggable css={top ? topCardPositionCss(pileIndex, cardIndex) : bottomCardPositionCss(pileIndex, cardIndex)}
                            key={animal ?? pileIndex + "_" + cardIndex}
                            type="animal"
                            item={{ animal, pileIndex }}
                            canDrag={draggable && cardIndex == pile.length - 1}
                            drop={play}>

                            <AnimalCard
                                animal={animal ?? undefined} />
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
    
    //todo change to top+left


`


