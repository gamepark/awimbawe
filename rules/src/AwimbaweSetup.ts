import { MaterialGameSetup, MaterialItem } from '@gamepark/rules-api'
import sample from 'lodash/sample'
import shuffle from 'lodash/shuffle'
import { AwimbaweOptions } from './AwimbaweOptions'
import AwimbaweRules from './AwimbaweRules'
import { animals, getCrowns } from './material/Animal'
import Heir, { heirs } from './material/Heir'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

export const START_HAND = 6

export class AwimbaweSetup extends MaterialGameSetup<Heir, MaterialType, LocationType, AwimbaweOptions> {
  Rules = AwimbaweRules

  setupMaterial(_options: AwimbaweOptions) {
    this.setupAnimalCards()
    this.setupHeirCards()
  }

  setupHeirCards() {
    const items = heirs.map((heir) => ({ id: heir, location: { type: LocationType.HeirCard }}))
    this.material(MaterialType.HeirCard).createItems(items)
  }

  setupAnimalCards() {
    const shuffledAnimal = shuffle(animals)

    const player1Items = shuffledAnimal.splice(0, START_HAND).map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: Heir.WhiteTiger } }))
    this.material(MaterialType.AnimalCard).createItems(player1Items)

    const player2Items = shuffledAnimal.splice(0, START_HAND).map((animal) => ({ id: animal, location: { type: LocationType.Hand, player: Heir.BlackPanther } }))
    this.material(MaterialType.AnimalCard).createItems(player2Items)

    for (const heir of heirs) {
      // Do it for 4 columns
      for (let i = 0; i < 8; i++) {
        const column = (i % 4) + 1
        const item: MaterialItem = {
          id: shuffledAnimal.shift(),
          location: { type: LocationType.PlayerColumns, player: heir, id: column }
        }

        if (i < 4) {
          item.location.rotation = { y: 1 }
        }

        this.material(MaterialType.AnimalCard).createItem(item)
      }
    }
  }

  start() {
    const pantherCrowns  = this.getPlayerCrowns(Heir.BlackPanther)
    const tigerCrowns  = this.getPlayerCrowns(Heir.WhiteTiger)
    
    let lead = undefined
    if (pantherCrowns === tigerCrowns) {
      lead = sample(heirs)
    } else if (pantherCrowns < tigerCrowns) {
      lead = Heir.BlackPanther
    } else {
      lead = Heir.WhiteTiger
    }
    
    this.memorize(Memory.Lead, lead)
    return this.startPlayerTurn(RuleId.ChooseCard, lead!)
  }

  getPlayerCrowns(player: Heir) {
    // Rechercher les MaterialType.AnimalCard dans LocationType.PlayerColumns
    const items = this
      .material(MaterialType.AnimalCard)
      .location(LocationType.PlayerColumns)
      .player(player)
      .rotation((rotation: Record<string, any>) => rotation?.y !== 1)
      .getItems()

    // Parcourir les cartes, et pour chaque animal, additionner les couronnes
    let count = 0
    for (const item of items) {
      count = count + getCrowns(item.id)
    }

    return count
  }

}
