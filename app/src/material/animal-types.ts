import Animal, { isCheetah, isEagle, isElephant, isHyena, isMouse, isRhinoceros, isSnake } from '@gamepark/awimbawe/material/Animal'


export const getAnimalTitle = (animal: Animal) => {
  if (animal <= 10) return 'help.card.eagle.title'
  switch (animal % 10) {
    case 1:
      return 'help.card.mouse.title'
    case 2:
      return 'help.card.rhino.title'
    case 3:
      return 'help.card.cheetah.title'
    case 4:
      return 'help.card.hyena.title'
    case 5:
      return 'help.card.snake.title'
    case 6:
      return 'help.card.elephant.title'
  }

  return ''
}

export const getAnimalColor = (animal: Animal) => {
  if (animal <= 10) return 'help.card.sky'
  switch (Math.floor((animal-1)/10)) {
    case 1:
      return 'help.card.grassland'
    case 2:
      return 'help.card.desert'
    case 3:
      return 'help.card.mountain'
    case 4:
      return 'help.card.plain'
  }

  return ''
}

export const getHistoryCard = (animal: Animal) => {
  if (isMouse(animal)) return 'history.card.mouse'
  if (isCheetah(animal)) return 'history.card.cheetah'
  if (isElephant(animal)) return 'history.card.elephant'
  if (isSnake(animal)) return 'history.card.snake'
  if (isRhinoceros(animal)) return 'history.card.rhino'
  if (isHyena(animal)) return 'history.card.hyena'
  if (isEagle(animal)) return 'history.card.eagle'
  return ''
}