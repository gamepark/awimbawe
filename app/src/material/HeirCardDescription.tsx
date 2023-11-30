import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Images from '../images/Images'
import Heir from '@gamepark/awimbawe/material/Heir'

export class HeirCardDescription extends CardDescription {

  backImages = {
    [Heir.WhiteTiger]: Images.WhiteTigerGold,
    [Heir.BlackPanther]: Images.BlackPantherGold
  }

  images = {
    [Heir.WhiteTiger]: Images.WhiteTiger,
    [Heir.BlackPanther]: Images.BlackPanther
  }


  isFlipped(item: MaterialItem) {
    return item.location.rotation
  }

  rules = () => <p></p>
}

export const heirCardDescription = new HeirCardDescription()
