import {isEnumValue} from '@gamepark/rules-api'

enum Heir {
  WhiteTiger = 1, BlackPanther
}

export default Heir

export const heirs = Object.values(Heir).filter(isEnumValue)

export function otherHeir(heir: Heir): Heir {
  switch (heir) {
    case Heir.WhiteTiger:
      return Heir.BlackPanther
    case Heir.BlackPanther:
      return Heir.WhiteTiger
  }
}