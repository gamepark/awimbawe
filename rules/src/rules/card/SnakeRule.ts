import { MaterialType } from "../../material/MaterialType"
import { LocationType } from "../../material/LocationType"
import { CardRule } from "./CardRule"

export class SnakeRule extends CardRule {
    getPlayerMoves() {

        // TODO: chercher les cartes du joueur et utiliser le .moveItems({ rotation: { z: 1 }})
        // On verra après les limitations pour l'utilisation des cartes en question

        const moves = this
            .material(MaterialType.AnimalCard)
            .location(LocationType.Hand)
            .player((p) => this.player !== p)
            .moveItems({ rotation: { z: 1 }})

        for (let column = 1; column <= 4; column++) {
            const rotateColumnCard = this
                .material(MaterialType.AnimalCard)
                .location(LocationType.PlayerColumns)
                .locationId(column)
                .player((p) => this.player !== p)
                .maxBy((item) => item.location.x!) 
            
            if (rotateColumnCard.length) {            
                moves.push(rotateColumnCard.rotateItem((item) => ({ ...item.location.rotation, z: 1 })))
            }
            
        }

        return moves
    }

    afterItemMove() {
        return this.afterEffectPlayed()
    }
}
