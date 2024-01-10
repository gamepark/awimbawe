import {isMoveItemType, isShuffleItemType} from '@gamepark/rules-api'
import {MaterialGameAnimations} from '@gamepark/react-game'
import {LocationType} from '@gamepark/awimbawe/material/LocationType'
import {MaterialType} from '@gamepark/awimbawe/material/MaterialType'

export const awimbaweAnimations = new MaterialGameAnimations()

awimbaweAnimations.when()
    .move((move) => isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.Deck)
    .duration(0.2)

awimbaweAnimations.when()
    .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move) && context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.Deck)
    .duration(0.2)

awimbaweAnimations.when()
    .move(isShuffleItemType(MaterialType.AnimalCard))
    .none()
