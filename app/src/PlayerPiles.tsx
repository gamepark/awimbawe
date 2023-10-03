import { FC } from 'react'

export const PlayerPiles: FC = () => null
// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import Animal from "@gamepark/awimbawe/Animal";
// import { getCardAnimal, isKnownCard } from "@gamepark/awimbawe/GameView";
// import { blockAnimalInPileMove } from "@gamepark/awimbawe/moves/BlockAnimalInPile";
// import StockAnimal from "@gamepark/awimbawe/StockAnimal";
// import { usePlay } from "@gamepark/react-client";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import AnimalCard from "./material/AnimalCard";
// import { cardHeight, cardWidth, headerHeight, topPileLeft } from "./styles";
//
// type Props = {
//   piles: Partial<StockAnimal>[][];
//   top?: boolean;
//   draggable: boolean;
//   canBlock?: boolean;
// };
//
// export default function PlayerPiles({ piles, top, draggable, canBlock = false }: Props) {
//   const play = usePlay();
//   const [selectedAnimal, setSelectedAnimal] = useState<Animal>();
//
//   const { t } = useTranslation();
//                                       return (
//     <>
//       {piles.map((pile, pileIndex) =>
//         pile.map((card, cardIndex) => (
//           <Draggable
//             css={
//               [top
//                 ? topCardPositionCss(pileIndex, cardIndex)
//                 : bottomCardPositionCss(pileIndex, cardIndex), piles[pileIndex][cardIndex].blocked && blockCss]
//             }
//             key={isKnownCard(card) ? card.animal : pileIndex + "_" + cardIndex}
//             type="animal"
//             item={{ animal: getCardAnimal(card), pileIndex }}
//             canDrag={
//               draggable &&
//               !piles[pileIndex][pile.length - 1].blocked &&
//               cardIndex === pile.length - 1
//             }
//             drop={play}
//             onClick={() => setSelectedAnimal(getCardAnimal(card))}
//           >
//             <AnimalCard animal={getCardAnimal(card)} />
//           </Draggable>
//         ))
//       )}
//
//       <Dialog
//         open={selectedAnimal !== undefined}
//         onBackdropClick={() => setSelectedAnimal(undefined)}
//       >
//         <Letterbox css={dialogLetterBoxCss} top={0}>
//           <AnimalCard css={animalBigCss} animal={selectedAnimal} />
//           {canBlock && <button
//             css= {buttonBlockCss}
//             onClick={() => {
//               play(
//                 blockAnimalInPileMove(
//                   piles.findIndex((pile) =>
//                     pile.some((card) => card.animal === selectedAnimal)
//                   )
//                 )
//               );
//               setSelectedAnimal(undefined)
//             }
//           }
//           >
//             {t("bloquer")}
//           </button>}
//         </Letterbox>
//       </Dialog>
//     </>
//   );
// }
//
//
// const bottomCardPositionCss = (pileIndex: number, cardIndex: number) => css`
//   position: absolute;
//   top: ${64 + cardIndex * (cardHeight / 3)}em;
//   left: ${105 + pileIndex * (cardWidth + 1)}em;
// `;
// const topCardPositionCss = (pileIndex: number, cardIndex: number) => css`
//   position: absolute;
//   top: ${headerHeight + 1 + cardIndex * (cardHeight / 3)}em;
//   left: ${topPileLeft(pileIndex)}em;
// `;
//
// const blockCss = css`
//   filter: brightness(50%);
//   transition: filter 0.2s ease-in-out;
// `;
//
// const animalBigCss = css`
//   position: absolute;
//   font-size: 3em;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;
//
// const buttonBlockCss = css`
//   position: absolute;
//   font-size: 5em;
//   top: 90%;
//   left: 50%;
//   transform: translateX(-50%);
//   text-align: center;
//   border-radius: 0.4em;
//   border: 0.2em solid rgba(255, 255, 255, 0.9);
//   text-transform: uppercase;
//   cursor: pointer;
// `;
//
// const dialogLetterBoxCss = css`
//   pointer-events: none;
//   > * > * {
//     pointer-events: auto;
//   }
//
// `;
//
//
