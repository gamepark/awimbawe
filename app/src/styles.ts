import { css, keyframes } from "@emotion/react"

export const cardHeight = 23
export const cardWidth = cardHeight * 744 / 1039
export const screenRatio = 16/9
export const handLeft = 50
export const headerHeight = 7
export const topPileLeft = (index : number) => 1 + index * (cardWidth + 1)
export const slideKeyframes = keyframes`
  0%, 30% {
    transform: translate(-33%, 33%);
  }
  70%, 100% {
    transform: translate(33%, -33%);

  }
`
export const shineEffect = css`
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    animation: ${slideKeyframes} 3s infinite;
    z-index: 1;
    background: linear-gradient(to top right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 33%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 67%,
    rgba(255, 255, 255, 0) 100%);
  }
`