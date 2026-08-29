import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isShuffleItemType } from '@gamepark/rules-api'

export const awimbaweAnimations = new MaterialGameAnimations()

awimbaweAnimations
  .configure((move) => isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.Deck)
  .duration(200)

awimbaweAnimations
  .configure(
    (move, context) =>
      isMoveItemType(MaterialType.AnimalCard)(move) && context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.Deck
  )
  .duration(200)

awimbaweAnimations
  .configure(
    (move, context) =>
      isMoveItemType(MaterialType.AnimalCard)(move) &&
      (context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.PlayerTrickStack ||
        move.location.type === LocationType.PlayerTrickStack ||
        move.location.type === LocationType.PlayerHyena)
  )
  .duration(700)

awimbaweAnimations
  .configure(
    (move, context) =>
      isMoveItemType(MaterialType.AnimalCard)(move) &&
      context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.PlayerColumns &&
      context.rules.game.items[move.itemType]![move.itemIndex].location?.rotation?.y === 1 &&
      !move.location.rotation.y
  )
  .duration(700)

awimbaweAnimations
  .configure(
    (move, context) =>
      isMoveItemType(MaterialType.AnimalCard)(move) &&
      ((context.rules.game.items[move.itemType]![move.itemIndex].location?.rotation?.z === 1 && !move.location?.rotation?.z) ||
        move.location?.rotation?.z === 1)
  )
  .duration(500)

awimbaweAnimations.configure(isShuffleItemType(MaterialType.AnimalCard)).skip()
