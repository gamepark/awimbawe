/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Animal from "@gamepark/awimbawe/Animal"
import { canPlay} from "@gamepark/awimbawe/Awimbawe"
import GameView, { MyPlayerView} from "@gamepark/awimbawe/GameView"
import Heir from "@gamepark/awimbawe/Heir"
import { playAnimalMove } from "@gamepark/awimbawe/moves/PlayAnimal"
import { useDrop } from "react-dnd"

type Props = {
    playerId : Heir
    game : GameView
}

export default function PlayDropArea({playerId, game}: Props) {
    const [{ dragging, isOver, canDrop }, dropRef] = useDrop({
        accept: "animal",
        collect: monitor => ({
            dragging: monitor.getItemType() === "animal",
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        }),
        canDrop: (item : {animal:Animal}) => canDropAnimal(item.animal,game,playerId),
        drop: (item: {animal:Animal}) => playAnimalMove(playerId,item.animal)
    })
    return (
        // todo afficher texte de l'erreur if cannotDrop

        <div ref={dropRef} css={[styleCss, dragging && draggingCss, isOver && overCss, dragging && !canDrop && cannotDropCss]}>
        </div>

    )


}

function canDropAnimal(animal : Animal, game : GameView, playerId : Heir ) : boolean{
    if(game.lead === playerId){
        return true
    }else{
        const opponentAnimal = game[game.lead].played!
        return (canPlay(animal,opponentAnimal,getMyAvaibleCards(game[playerId] as MyPlayerView)))
    }
}

function getMyAvaibleCards(player : MyPlayerView){
    return [...player.hand, ...player.piles.filter(pile => pile.length>0).map(pile => pile[pile.length - 1]!)]
}

const styleCss = css`
position: absolute;
height: 25em ;
width: 25em ;
top: 40em;
left: 77em;
border-radius : 1em;
`

const overCss = css`
background-color: rgba(0, 255, 0, 0.5);

`
const draggingCss =css`
background-color: rgba(0,255,0,0.2);
`

const cannotDropCss=css`
background-color: rgba(255,0,0,0.5);
`