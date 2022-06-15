/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Animal, { sameSuit } from "@gamepark/awimbawe/Animal"
import { canPlay} from "@gamepark/awimbawe/Awimbawe"
import GameView, { MyPlayerView} from "@gamepark/awimbawe/GameView"
import Heir from "@gamepark/awimbawe/Heir"
import { playAnimalMove } from "@gamepark/awimbawe/moves/PlayAnimal"
import { useMemo } from "react"
import { useDrop } from "react-dnd"
import { useTranslation } from "react-i18next"

type Props = {
    playerId : Heir
    game : GameView
}

type AnimalDragObject = {
    animal : Animal
}

export default function PlayDropArea({playerId, game}: Props) {
    const {t} = useTranslation()
    const avaibleAnimals = useMemo( () =>  getMyAvaibleCards(game[playerId] as MyPlayerView), [game,playerId]) // memo
    const opponentAnimal = game[game.lead].played!
    const [{ draggingAnimal , isOver, canDrop }, dropRef] = useDrop({
        accept: "animal",
        collect: monitor => ({
            draggingAnimal: monitor.getItemType() === "animal" ? monitor.getItem<AnimalDragObject>().animal : undefined,
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        }),
        canDrop: (item : AnimalDragObject) => canDropAnimal(item.animal,game,playerId),
        drop: (item: AnimalDragObject) => playAnimalMove(playerId,item.animal)
    })
    return (


        <div ref={dropRef} css={[styleCss, draggingAnimal && draggingCss, isOver && overCss, draggingAnimal && !canDrop && cannotDropCss]}>
            {draggingAnimal && !canDrop && <span css={errorCss}> {
                avaibleAnimals.some(animal => sameSuit(animal,opponentAnimal)) ?
                    t("You must play an animal with the same suit")
                :
                    t("You must play an eagle")
            } </span>}
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

const errorCss=css`
display: inline;
`

