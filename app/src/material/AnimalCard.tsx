/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Animal from '@gamepark/awimbawe/Animal'
import {HTMLAttributes} from 'react'
import Images from '../images/Images'
import {cardHeight, cardWidth} from '../styles'

type Props = {
  animal?: Animal
} & HTMLAttributes<HTMLDivElement>

export default function AnimalCard({animal, ...props}: Props) {
  return (
    <div css={[style, animal ? front(animal) : hidden]} {...props}/>
  )
}

const style = css`
  position: absolute;
  width: ${cardWidth}em;
  height: ${cardHeight}em;
  transform-style: preserve-3d;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
  transition: transform 1s ease-in-out;

  &:before, &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    backface-visibility: hidden;
    border-radius: 1em;
    box-shadow: 0 0 1em black, 0 0 1em black;
  }

  &:after {
    background-image: url(${Images.cardBack});
    transform: rotateY(-180deg);
  }
`

const front = (animal: Animal) => css`
  &:before {
    background-image: url(${AnimalImage[animal]});
  }
`

const AnimalImage: { [key in Animal]: string } = {
  [Animal.Eagle7]: Images.eagle7,
  [Animal.Eagle8]: Images.eagle8,
  [Animal.Eagle9]: Images.eagle9,
  [Animal.Eagle10]: Images.eagle10,
  [Animal.GrasslandMouse]: Images.grasslandMouse,
  [Animal.GrasslandRhinoceros]: Images.grasslandRhinoceros,
  [Animal.GrasslandCheetah]: Images.grasslandCheetah,
  [Animal.GrasslandHyena]: Images.grasslandHyena,
  [Animal.GrasslandSnake]: Images.grasslandSnake,
  [Animal.GrasslandElephant]: Images.grasslandElephant,
  [Animal.DesertMouse]: Images.desertMouse,
  [Animal.DesertRhinoceros]: Images.desertRhinoceros,
  [Animal.DesertCheetah]: Images.desertCheetah,
  [Animal.DesertHyena]: Images.desertHyena,
  [Animal.DesertSnake]: Images.desertSnake,
  [Animal.DesertElephant]: Images.desertElephant,
  [Animal.MountainMouse]: Images.mountainMouse,
  [Animal.MountainRhinoceros]: Images.mountainRhinoceros,
  [Animal.MountainCheetah]: Images.mountainCheetah,
  [Animal.MountainHyena]: Images.mountainHyena,
  [Animal.MountainSnake]: Images.mountainSnake,
  [Animal.MountainElephant]: Images.mountainElephant,
  [Animal.PlainMouse]: Images.plainMouse,
  [Animal.PlainRhinoceros]: Images.plainRhinoceros,
  [Animal.PlainCheetah]: Images.plainCheetah,
  [Animal.PlainHyena]: Images.plainHyena,
  [Animal.PlainSnake]: Images.plainSnake,
  [Animal.PlainElephant]: Images.plainElephant,
}

const hidden = css`
  transform: rotateY(180deg);
`