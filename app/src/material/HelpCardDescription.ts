import {CardDescription} from '@gamepark/react-game'
import Help from '../images/help.jpg'
import {HelpCardHelp} from "./help/HelpCardHelp";
import {LocationType} from "@gamepark/awimbawe/material/LocationType";

export class HelpCardDescription extends CardDescription {

  image = Help

  staticItem = { location: { type: LocationType.HelpCard }}

  help = HelpCardHelp
}

export const helpCardDescription = new HelpCardDescription()
