import { isEnumValue } from '@gamepark/rules-api'

enum Animal {
  Eagle7 = 7, Eagle8, Eagle9, Eagle10,
  GrasslandMouse = 11, GrasslandRhinoceros, GrasslandCheetah, GrasslandHyena, GrasslandSnake, GrasslandElephant,
  DesertMouse = 21, DesertRhinoceros, DesertCheetah, DesertHyena, DesertSnake, DesertElephant,
  MountainMouse = 31, MountainRhinoceros, MountainCheetah, MountainHyena, MountainSnake, MountainElephant,
  PlainMouse = 41, PlainRhinoceros, PlainCheetah, PlainHyena, PlainSnake, PlainElephant
}

export default Animal

export const animals = Object.values(Animal).filter(isEnumValue)

export function isEagle(animal: Animal) {
  return animal <= 10
}

export function isHyena(animal: Animal) {
  return animal % 10 == 4
}

export function isMouse(animal: Animal){
  return animal % 10 == 1
}

export function isElephant(animal: Animal){
  return animal % 10 == 6
}

export function isRhinoceros(animal: Animal){
  return animal % 10 == 2
}

export function isSerpent(animal:Animal){
  return animal % 10 == 5
}

export function getAnimalPower(animal: Animal) {
  return isEagle(animal) ? animal : animal % 10
}

// export function sameAnimal(animal1 : Animal , animal2 : Animal){
//   return animal1 % 10 == animal2 % 10
// }

export function sameSuit(animal1 : Animal, animal2: Animal){
  return Math.floor((animal1-1)/10) === Math.floor((animal2-1)/10)
}







