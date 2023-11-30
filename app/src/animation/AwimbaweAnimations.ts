import { isMoveItemType, isShuffleItemType, MaterialMove } from '@gamepark/rules-api'
import { AnimationStep } from '@gamepark/react-client'
import { MaterialAnimationContext, MaterialGameAnimations } from '@gamepark/react-game'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'

export class AwimbaweAnimations extends MaterialGameAnimations {

  override getDuration(move: MaterialMove, context: MaterialAnimationContext): number {
    if (isMoveItemType(MaterialType.AnimalCard)(move)
      && move.location?.type === LocationType.Deck
      && context.step === AnimationStep.BEFORE_MOVE
    ) return 0.2

    if (isMoveItemType(MaterialType.AnimalCard)(move)
      && context.game.items[move.itemType]![move.itemIndex].location.type === LocationType.Deck
      && context.step === AnimationStep.BEFORE_MOVE
    ) return 0.2

    if (isShuffleItemType(MaterialType.AnimalCard)(move)) return 0
    return super.getDuration(move, context);
  }
}
