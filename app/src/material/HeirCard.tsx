import { FC } from "react";

export const HeirCard: FC = () => null
// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
// import Heir from '@gamepark/awimbawe/Heir'
// import { HTMLAttributes } from 'react'
// import Images from '../images/Images'
// import { cardHeight, cardWidth } from '../styles'

// type Props = {
//   heir: Heir
//   flipped?: boolean
// } & HTMLAttributes<HTMLDivElement>

// export default function HeirCard({ heir, flipped, ...props }: Props) {
//   return (
//     <div css={[style, heir ? imageCss(heir) : hidden ]} {...props} />
//   )
// }

// const style = css`
//   position: absolute;
//   width: ${cardWidth}em;
//   height: ${cardHeight}em;
//   transform-style: preserve-3d;
//   transform: translateZ(0);
//   -webkit-font-smoothing: subpixel-antialiased;
//   transition: transform 1s ease-in-out;

//   &:before, &:after {
//     position: absolute;
//     content: '';
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background-size: cover;
//     backface-visibility: hidden;
//     border-radius: 1em;
//     box-shadow: 0 0 1em black, 0 0 1em black;
//   }

// `



// const imageCss = (heir: Heir) => css`
  
// &:before {
//     background-image: url(${heir === Heir.WhiteTiger ? Images.whiteTiger : Images.blackPanther});
//   }
//   &:after {
//     background-image: url(${heir === Heir.WhiteTiger ? Images.whiteTigerGold : Images.blackPantherGold});
//     transform: rotateY(-180deg);
//   }
// `







// const hidden = css`
//   transform: rotateY(180deg);
// `