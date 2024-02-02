import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { HistoryDescription, HistoryEntryOptions } from '@gamepark/react-client'
import { isMoveItem, isShuffle, isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export class AwimbaweHistory implements HistoryDescription<MaterialGame, MaterialMove> {
    getHistoryEntry(move: MaterialMove<number, number, number>, options: HistoryEntryOptions<MaterialGame<Heir, MaterialType, LocationType>>) {
        if (isStartRule(move) || isStartPlayerTurn(move)) {
            return <Trans defaults={options.action.played + "La règle à changé 🤔"} />
        }

        if (isMoveItem(move)) {
            return <Trans defaults="Quelquechose vient de bouger 😱" />
        }

        if (isShuffle(move)) {
            return <Trans defaults="Je ne comprends pas, tout est mélangé 🤪" />
        }

        return <>{JSON.stringify(move)}</>
    }

}