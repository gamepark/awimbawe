import {isEnumValue} from '@gamepark/rules-api'

enum Animal {
  Eagle7 = 7, Eagle8, Eagle9, Eagle10,
  GrasslandMouse = 11, GrasslandRhinoceros, GrasslandCheetah, GrasslandHyena, GrasslandSnake, GrasslandElephant,
  DesertMouse = 21, DesertRhinoceros, DesertCheetah, DesertHyena, DesertSnake, DesertElephant,
  MountainMouse = 31, MountainRhinoceros, MountainCheetah, MountainHyena, MountainSnake, MountainElephant,
  PlainMouse = 41, PlainRhinoceros, PlainCheetah, PlainHyena, PlainSnake, PlainElephant
}

export default Animal

export const animals = Object.values(Animal).filter(isEnumValue)