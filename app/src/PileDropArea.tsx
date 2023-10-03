import { FC } from 'react'
export const PileDropArea: FC = () => null
// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// import { movePileAnimalMove } from "@gamepark/awimbawe/moves/MovePileAnimal";
// import { useDrop } from "react-dnd";
// import { AnimalDragObject, AnimalItemType } from "./material/AnimalCard";
// import { cardWidth, topPileLeft } from "./styles";
//
// type Props = {
//     pileIndex : number,
// };
//
// export default function PileDropArea({ pileIndex }: Props) {
//
//   const [{  isOver, canDrop }, dropRef] = useDrop({
//     accept: AnimalItemType,
//     collect: (monitor) => ({
//       canDrop: monitor.canDrop(),
//       isOver: monitor.isOver(),
//     }),
//     drop: (item: AnimalDragObject) => movePileAnimalMove(item.pileIndex! ,pileIndex)
//   });
//   return (
//     <div
//       ref={dropRef}
//       css={[
//         styleCss(pileIndex),
//         canDrop && draggingCss,
//         canDrop && isOver && overCss,
//       ]}
//     >
//     </div>
//   );
// }
//
//
// const styleCss = (pileIndex : number) => css`
//   position: absolute;
//   height: 10em;
//   width: ${cardWidth}em;
//   top: 5em;
//   left: ${topPileLeft(pileIndex)}em;
//   border-radius: 1em;
//   // pointer-events: none;
//   // > * > * {
//   //   pointer-events: auto;
//   // }
// `;
// //question
// const overCss = css`
//   background-color: rgba(0, 255, 0, 0.5);
// `;
// const draggingCss = css`
//   background-color: rgba(0, 255, 0, 0.2);
// `;
//
