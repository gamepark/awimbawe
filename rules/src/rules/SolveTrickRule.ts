import { MaterialMove, MaterialRulesPart, RuleMove } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import Heir from "../material/Heir";
import Animal, { getAnimalPower, isEagle, isElephant, isHyena, isMouse, sameSuit } from "../material/Animal";
import { RuleId } from "./RuleId";
import { Memory } from "./Memory";

export class SolveTrickRule extends MaterialRulesPart<Heir, MaterialType, LocationType> {

    onRuleStart(_move: RuleMove) {
        const lead = this.lead
        const opponent = this.lead === Heir.BlackPanther? Heir.WhiteTiger: Heir.BlackPanther
                
        const leadCard = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea).player(lead).getItem()!
        const opponentCard = this.material(MaterialType.AnimalCard).location(LocationType.PlayArea).player(opponent).getItem()!

        const winnerAnimal = this.getWinnerAnimal(leadCard.id, opponentCard.id)
        const winner = winnerAnimal === leadCard.id? lead: opponent
        const moves: MaterialMove[] = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.PlayArea)
            .moveItems((item) => {
              if (isHyena(item.id)){
                return { 
                  location: { 
                      type: LocationType.PlayerHyena, 
                      player: winner
                  }
                }
              }
              
              return { 
                location: { 
                    type: LocationType.PlayerTrickStack, 
                    player: winner
                }
              }
            })

        this.memorize(Memory.Lead, winner)
        moves.push(this.rules().startRule(RuleId.EndOfTurn))

        return moves;
    }
    
    getWinnerAnimal(animal1: Animal, animal2: Animal) {
      
      if (sameSuit(animal1, animal2)) {
        if (isMouse(animal1) && isElephant(animal2)) {
          return animal1;
        } else if (isMouse(animal2) && isElephant(animal1)) {
          return animal2;
        } else {
          return getAnimalPower(animal1) > getAnimalPower(animal2)
            ? animal1
            : animal2;
        }
      } else {
        if (isEagle(animal1) || isEagle(animal2)) {
            return getAnimalPower(animal1) > getAnimalPower(animal2)
              ? animal1
              : animal2;
        }
        return animal1;
      } 
      
    }

    get lead() {
      return this.remind(Memory.Lead)
    }

}