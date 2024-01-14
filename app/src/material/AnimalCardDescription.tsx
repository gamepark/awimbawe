import { CardDescription } from '@gamepark/react-game'
import Images from '../images/Images'
import Animal from '@gamepark/awimbawe/material/Animal'
import { AnimalCardHelp } from './help/AnimalCardHelp'

export class AnimalCardDescription extends CardDescription {
  width = 6.35
  height = 8.89

  backImage = Images.cardBack

  images = {
    [Animal.Eagle7]: Images.Eagle7,
    [Animal.Eagle8]: Images.Eagle8,
    [Animal.Eagle9]: Images.Eagle9,
    [Animal.Eagle10]: Images.Eagle10,
    [Animal.GrasslandMouse]: Images.GrasslandMouse,
    [Animal.GrasslandRhinoceros]: Images.GrasslandRhinoceros,
    [Animal.GrasslandCheetah]: Images.GrasslandCheetah,
    [Animal.GrasslandHyena]: Images.GrasslandHyena,
    [Animal.GrasslandSnake]: Images.GrasslandSnake,
    [Animal.GrasslandElephant]: Images.GrasslandElephant,
    [Animal.DesertMouse]: Images.DesertMouse,
    [Animal.DesertRhinoceros]: Images.DesertRhinoceros,
    [Animal.DesertCheetah]: Images.DesertCheetah,
    [Animal.DesertHyena]: Images.DesertHyena,
    [Animal.DesertSnake]: Images.DesertSnake,
    [Animal.DesertElephant]: Images.DesertElephant,
    [Animal.MountainMouse]: Images.MountainMouse,
    [Animal.MountainRhinoceros]: Images.MountainRhinoceros,
    [Animal.MountainCheetah]: Images.MountainCheetah,
    [Animal.MountainHyena]: Images.MountainHyena,
    [Animal.MountainSnake]: Images.MountainSnake,
    [Animal.MountainElephant]: Images.MountainElephant,
    [Animal.PlainMouse]: Images.PlainMouse,
    [Animal.PlainRhinoceros]: Images.PlainRhinoceros,
    [Animal.PlainCheetah]: Images.PlainCheetah,
    [Animal.PlainHyena]: Images.PlainHyena,
    [Animal.PlainSnake]: Images.PlainSnake,
    [Animal.PlainElephant]: Images.PlainElephant,
  }
  

  help = AnimalCardHelp
}

export const animalCardDescription = new AnimalCardDescription()
