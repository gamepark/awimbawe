import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Images from '../images/Images'
import Heir from '@gamepark/awimbawe/material/Heir'
import { HeirCardHelp } from './help/HeirCardHelp'

export class HeirCardDescription extends CardDescription {

  backImages = {
    [Heir.WhiteTiger]: Images.WhiteTigerGold,
    [Heir.BlackPanther]: Images.BlackPantherGold
  }

  images = {
    [Heir.WhiteTiger]: Images.WhiteTiger,
    [Heir.BlackPanther]: Images.BlackPanther
  }


  isFlipped = (item: MaterialItem) => item.location.rotation

  help = HeirCardHelp
}

export const heirCardDescription = new HeirCardDescription()
