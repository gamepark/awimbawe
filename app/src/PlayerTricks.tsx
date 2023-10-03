export const PlayerTricks = () => null

// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import Animal, { isHyena } from "@gamepark/awimbawe/Animal";
// import AnimalCard from "./material/AnimalCard";

// type Props = {
//   tricks: Animal[];
//   top? : boolean;
// }

// export default function PlayerTricks({ tricks, top = false }: Props) {
//   return (
//     <>
//       {tricks.map((animal, index) => (
//         <AnimalCard css={top ? cssTopTricks(index,isHyena(animal),tricks.length) : cssBottomTricks(index,isHyena(animal),tricks.length)} key={animal} animal= { isHyena(animal) ? animal : undefined } />
//       ))}
//     </>
//   );
// }

// const cssBottomTricks = (cardIndex: number, isHyena: boolean, numberCard: number) => css`
//   position: absolute;
//   left: ${isHyena ? 5 : 1.5}em;
//   bottom: ${numberCard < 5 ? 15 + cardIndex*3 : 5 + cardIndex*2}em;
// `;

// const cssTopTricks = (cardIndex: number, isHyena: boolean, numberCard : number) => css`
//   position: absolute;
//   right: ${isHyena ? 5 : 1.5}em;
//   top: ${numberCard < 5 ? 15 + cardIndex*3 : 5 + cardIndex*2}em;

// `;
  
// //ajouter un écart plus fin après un certain nombre de pli via css