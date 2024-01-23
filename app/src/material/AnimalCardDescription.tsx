import Animal from '@gamepark/awimbawe/material/Animal'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import Images from '../images/Images'
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

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return super.canShortClick(move, context) || (isMoveItemType(MaterialType.AnimalCard)(move) && move.itemIndex === context.index && move.location.rotation?.z === 1)
  }

  help = AnimalCardHelp
}

export const animalCardDescription = new AnimalCardDescription()
