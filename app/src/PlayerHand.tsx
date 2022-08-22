/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getCardAnimal, PlayerView } from "@gamepark/awimbawe/GameView";
import { blockAnimalInHandMove } from "@gamepark/awimbawe/moves/BlockAnimalInHand";
import { usePlay } from "@gamepark/react-client";
import { Hand } from "@gamepark/react-components";
import AnimalCard from "./material/AnimalCard";
import { cardHeight, cardWidth, handLeft } from "./styles";
// import { blockAnimalInHandMove } from "@gamepark/awimbawe/moves/BlockAnimalInHand";

type Props = {
  player: PlayerView;
  top?: boolean;
  canDrag: boolean;
  canBlock?: boolean;
};

export default function PlayerHand({
  player,
  top,
  canDrag,
  canBlock = false,
}: Props) {
  const play = usePlay();
  return (  
        <Hand
          getItemProps={(index) => ({
            drag: {
              type: "animal",
              item: { animal: getCardAnimal(player.hand[index]) },
              canDrag,
              drop: play,
            },
            onClick:() => canBlock /*&& getAvailableAnimals(player)>1 && notblocked*/ && play(blockAnimalInHandMove(index))
          })}
          css={[handCss, top ? topCss : bottomCss]}
        >
          {player.hand.map((card, index) => (
            <AnimalCard
              key={getCardAnimal(card) ?? index}
              animal={getCardAnimal(card)} css={player.hand[index].blocked && blockCss}
            />
          ))}
        </Hand>  
  );
}

const handCss = css`
  position: absolute;
  width: ${cardWidth}em;
  height: ${cardHeight}em;
`;

const topCss = css`
  top: 16em;
  right: ${handLeft}em;
  transform: scaleY(-1);
`;

const bottomCss = css`
  bottom: 10em;
  left: ${handLeft}em;
`;

const blockCss = css`
  &:after, &:before{
    filter: brightness(50%);
    transition: filter 0.2s ease-in-out;
  }  

`;


