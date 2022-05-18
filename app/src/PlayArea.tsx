/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Animal from "@gamepark/awimbawe/Animal"
import Heir from "@gamepark/awimbawe/Heir"
import { playAnimalMove } from "@gamepark/awimbawe/moves/PlayAnimal"
import { useDrop } from "react-dnd"

type Props = {
    playerId : Heir
}

export default function PlayArea({playerId}: Props) {
    const [{ isOver }, dropRef] = useDrop({
        accept: "animal",
        collect: monitor => ({
            isOver: monitor.isOver()
        }),
        drop: (item: {animal:Animal}) => playAnimalMove(playerId,item.animal)
    })
    return (

        <div ref={dropRef} css={[styleCss, isOver && overCss]}>

        </div>



    )






}



const styleCss = css`
position: absolute;
height: 10em ;
width: 50em ;
top: 50em;
left: 50em;
border: 2px solid #fff;
`

const overCss = css`
background-color: rgba(0, 255, 0, 0.5);

`