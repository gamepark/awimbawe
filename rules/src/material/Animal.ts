import { getEnumValues } from '@gamepark/rules-api'

enum Animal {
  Eagle7 = 7, 
  Eagle8, 
  Eagle9,
  Eagle10,

  GrasslandMouse = 11, 
  GrasslandRhinoceros, 
  GrasslandCheetah, 
  GrasslandHyena, 
  GrasslandSnake, 
  GrasslandElephant,

  DesertMouse = 21, 
  DesertRhinoceros, 
  DesertCheetah, 
  DesertHyena,
  DesertSnake,
  DesertElephant,

  MountainMouse = 31,
  MountainRhinoceros, 
  MountainCheetah, 
  MountainHyena,
  MountainSnake,
  MountainElephant,

  PlainMouse = 41, 
  PlainRhinoceros, 
  PlainCheetah, 
  PlainHyena, 
  PlainSnake, 
  PlainElephant
}

export const animals = getEnumValues(Animal)

export default Animal

//reduce 
export function getCrowns(animal: Animal) {
  // Mouse => 3
  if (isMouse(animal)) {
    return 3
  }

  if (isRhinoceros(animal)) {
    return 2
  }
    
  if (isCheetah(animal)) {
    return 2
  }
  
  if (isSnake(animal)) {
    return 1
  }
  
  if (isHyena(animal)) {
    return 3
  }
  
  if (isElephant(animal)) {
    return 1
  }

  if (isEagle(animal)) {
    if (animal === Animal.Eagle9) return -1
    if (animal === Animal.Eagle10) return -2
  }

  return 0
}


export function isEagle(animal: Animal): boolean {
  return animal <= 10
}


export function isMouse(animal: Animal): boolean {
  return animal % 10 === 1
}

export function isRhinoceros(animal: Animal): boolean {
  return animal % 10 === 2
}

export function isCheetah(animal: Animal): boolean {
  return animal % 10 === 3
}

export function isHyena(animal: Animal): boolean {
  return animal % 10 === 4
}

export function isSnake(animal:Animal): boolean {
  return animal % 10 === 5
}

export function isElephant(animal: Animal): boolean {
  return animal % 10 === 6
}

export function getAnimalPower(animal: Animal) {
  return isEagle(animal) ? animal : animal % 10
}

export function sameSuit(animal1 : Animal, animal2: Animal){
  return Math.floor((animal1-1)/10) === Math.floor((animal2-1)/10)
}





export function getCrown(animal : Animal){

  if(isMouse(animal) || isHyena(animal)){
    return 3
  }else if(isRhinoceros(animal) || isCheetah(animal)){
    return 2
  }else if(isSnake(animal) || isElephant(animal)){
    return 1
  }else if(animal == 7|| animal == 8){
    return 0
  }else if(animal == 9){
    return -1
  }else{
    return -2
  }

}

