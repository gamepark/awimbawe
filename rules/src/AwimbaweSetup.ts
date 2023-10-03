import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { RuleId } from './rules/RuleId'
import Heir, { heirs } from './Heir'
import { AwimbaweOptions } from './AwimbaweOptions'
import { locationsStrategies } from './configuration/LocationStrategies'
import { animals } from './material/Animal'
import shuffle from 'lodash/shuffle'
import { Memory } from './rules/Memory'

export const START_HAND = 6

export class AwimbaweSetup extends MaterialGameSetup<Heir, MaterialType, LocationType, AwimbaweOptions> {
  locationsStrategies = locationsStrategies

  setupMaterial(_options: AwimbaweOptions) {
    const shuffledAnimal = shuffle(animals)
    
    
    const player1Items = shuffledAnimal.splice(0, START_HAND).map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: Heir.WhiteTiger }}))
    this.material(MaterialType.AnimalCard).createItems(player1Items)

    const player2Items = shuffledAnimal.slice(0, START_HAND).map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: Heir.BlackPanther }}))
    this.material(MaterialType.AnimalCard).createItems(player2Items)

    for(const heir of heirs) {
      // Do it for 4 columns
      for (let i = 0; i < 8; i++) {
        const column = (i % 4) + 1
        const item: MaterialItem = { 
          id: shuffledAnimal.shift(), 
          location: { type: LocationType.Table, player: heir, id: column } 
        }

        if (i < 4) {
          item.rotation = { y: 1 }
        }

        this.material(MaterialType.AnimalCard).createItem(item)
      }
    }

    /**
     * [
     *  [1, 2],
     *  [3, 4],
     *  [5, 6],
     *  [7, 8],
     * ]
     */
  }

  start() {
    // TODO: Get player with less couronnes
    this.memorize(Memory.Lead, this.players[0])
    return { id: RuleId.ChooseCard, player: this.players[0] }
  }
}
