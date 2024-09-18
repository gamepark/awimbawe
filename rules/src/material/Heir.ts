import { getEnumValues } from '@gamepark/rules-api'

enum Heir {
  WhiteTiger = 1, BlackPanther
}

export default Heir

export const heirs = getEnumValues(Heir)

export function otherHeir(heir: Heir): Heir {
  switch (heir) {
    case Heir.WhiteTiger:
      return Heir.BlackPanther
    case Heir.BlackPanther:
      return Heir.WhiteTiger
  }
}