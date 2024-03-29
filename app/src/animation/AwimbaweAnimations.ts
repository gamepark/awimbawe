import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isShuffleItemType } from '@gamepark/rules-api'

export const awimbaweAnimations = new MaterialGameAnimations()

awimbaweAnimations.when()
  .move((move) => isMoveItemType(MaterialType.AnimalCard)(move) && move.location.type === LocationType.Deck)
  .duration(0.2)

awimbaweAnimations.when()
  .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move) && context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.Deck)
  .duration(0.2)

awimbaweAnimations.when()
  .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move)
    && (context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.PlayerTrickStack
      || move.location.type === LocationType.PlayerTrickStack
      || move.location.type === LocationType.PlayerHyena)
  )
  .duration(0.7)

awimbaweAnimations.when()
  .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move) && context.rules.game.items[move.itemType]![move.itemIndex].location.type === LocationType.PlayerColumns && context.rules.game.items[move.itemType]![move.itemIndex].location?.rotation?.y === 1 && !move.location.rotation.y)
  .duration(0.7)

awimbaweAnimations.when()
  .move((move, context) => isMoveItemType(MaterialType.AnimalCard)(move) && ((context.rules.game.items[move.itemType]![move.itemIndex].location?.rotation?.z === 1 && !move.location?.rotation?.z) || move.location?.rotation?.z === 1))
  .duration(0.5)

awimbaweAnimations.when()
  .move(isShuffleItemType(MaterialType.AnimalCard))
  .none()
