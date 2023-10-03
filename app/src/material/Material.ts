import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { animalCardDescription } from './AnimalCardDescription'
import { heirCardDescription } from './HeirCardDescription'

export const material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.AnimalCard]: animalCardDescription,
  [MaterialType.HeirCard]: heirCardDescription
}