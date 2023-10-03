/** @jsxImportSource @emotion/react */
import { LocationType } from "@gamepark/awimbawe/material/LocationType";
import { LocationDescription } from "@gamepark/react-game";
import { animalCardDescription } from "../../material/AnimalCardDescription";
//import { css } from "@emotion/react";

export class PlayerAreaDescription extends LocationDescription {
    //alwaysVisible = true
    //extraCss = css`background-color: #ffffff30`
    location = { type: LocationType.PlayArea }
    width = (animalCardDescription.width * 2) + 15
    height = animalCardDescription.getSize(0).height + 10
    borderRadius = animalCardDescription.borderRadius
    coordinates = { x: -10, y: 3, z: 0.1 }

}