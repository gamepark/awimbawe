import { MaterialType } from "../../material/MaterialType"
import { LocationType } from "../../material/LocationType"
import { CardRule } from "./CardRule"
import { ItemMove, MaterialMove } from "@gamepark/rules-api"

export class RhinocerosRule extends CardRule {
    getPlayerMoves() {

        // TODO: chercher les cartes du joueur et utiliser le .moveItems({ rotation: { z: 1 }})
        // On verra après les limitations pour l'utilisation des cartes en question

        const moves: MaterialMove[] = []

        for (let column = 1; column <= 4; column++) {
            const topCard = this
                .material(MaterialType.AnimalCard)
                .location(LocationType.PlayerColumns)
                .locationId(column)
                .player((p) => this.player !== p)
                .maxBy((item) => item.location.x!)    

            if (topCard.length) {
                const item = topCard.getItem()!
                for (let newColumn = 1; newColumn <= 4; newColumn++) {
                    moves.push(
                        topCard.moveItem({ location: {
                            type: LocationType.PlayerColumns,
                            id: newColumn,
                            player: item.location.player, 
                            x: 0
                        }})
                    )
                }
            }
        }

        return moves
    }

    afterItemMove(_move: ItemMove) {
        return this.afterEffectPlayed()
    }
}