/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Animal from '@gamepark/awimbawe/Animal'
import Card from './material/Card'
import { cardHeight, cardWidth } from './styles'

type Props = {
    piles: (Animal | null)[][]
    top?: boolean
}

export default function PlayerPiles({ piles, top }: Props) {

    return (
        <>

            {piles.map((pile, pileIndex) =>
                pile.map((animal, cardIndex) =>
                    <Card
                        key={animal ?? pileIndex + "_" + cardIndex}
                        css={top ? topCardPositionCss(pileIndex, cardIndex) : bottomCardPositionCss(pileIndex, cardIndex)}
                        animal={animal ?? undefined} />
                )
            )}
        </>
    )
}





const bottomCardPositionCss = (pileIndex: number, cardIndex: number) => css`
    top: ${72 + cardIndex * (cardHeight / 3)}em;
    left: ${95 + pileIndex * (cardWidth + 1)}em;


`
const topCardPositionCss = (pileIndex: number, cardIndex: number) => css`
    bottom: ${72 + cardIndex * (cardHeight / 3)}em;
    right: ${95 + pileIndex * (cardWidth + 1)}em;
    


`


