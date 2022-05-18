/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/awimbawe/Animal'
import { usePlay } from '@gamepark/react-client'
import { Draggable } from '@gamepark/react-components'
import AnimalCard from './material/AnimalCard'
import { cardHeight, cardWidth } from './styles'

type Props = {
    piles: (Animal | null)[][]
    top?: boolean
}

export default function PlayerPiles({ piles, top }: Props) {
    const play = usePlay()
    return (
        <>

            {piles.map((pile, pileIndex) =>
                pile.map((animal, cardIndex) =>
                    top || cardIndex < pile.length - 1 ?
                        <AnimalCard
                            css={top ? topCardPositionCss(pileIndex, cardIndex) : bottomCardPositionCss(pileIndex, cardIndex)}
                            key={animal ?? pileIndex + "_" + cardIndex}
                            animal={animal ?? undefined} />
                        :
                        <Draggable css={top ? topCardPositionCss(pileIndex, cardIndex) : bottomCardPositionCss(pileIndex, cardIndex)}
                            key={animal ?? pileIndex + "_" + cardIndex}
                            type="animal"
                            item={{ animal }}
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
    left: ${110 + pileIndex * (cardWidth + 1)}em;


`
const topCardPositionCss = (pileIndex: number, cardIndex: number) => css`
    position: absolute;
    bottom: ${64 - cardIndex * (cardHeight / 3)}em;
    right: ${110 + pileIndex * (cardWidth + 1)}em;
    
    


`


