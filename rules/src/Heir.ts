import {isEnumValue} from '@gamepark/rules-api'

enum Heir {
  WhiteTiger = 1, BlackPanther
}

export default Heir

export const heirs = Object.values(Heir).filter(isEnumValue)
