/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Animal, { isHyena } from "@gamepark/awimbawe/Animal";
import AnimalCard from "./material/AnimalCard";

type Props = {
  tricks: Animal[];
  top? : boolean;
}

export default function PlayerTricks({ tricks, top = false }: Props) {
  return (
    <>
      {tricks.map((animal, index) => (
        ( index < 8 ? true : isHyena(animal) ? true : false ) && <AnimalCard css={top ? cssTopTricks(index,isHyena(animal)) : cssBottomTricks(index,isHyena(animal))} key={animal} animal= { isHyena(animal) ? animal : undefined } />
      ))}
    </>
  );
}

const cssBottomTricks = (cardIndex: number, isHyena: boolean) => css`
  position: absolute;
  left: ${isHyena ? 5 : 1.5}em;
  bottom: ${15 + cardIndex*3}em;
`;

const cssTopTricks = (cardIndex: number, isHyena: boolean) => css`
  position: absolute;
  right: ${isHyena ? 5 : 1.5}em;
  top: ${15 + cardIndex*3 }em;
`;
  
//question