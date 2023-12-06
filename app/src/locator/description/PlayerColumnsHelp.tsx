import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { LocationHelpProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isSameLocationArea } from '@gamepark/rules-api'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const PlayerColumnHelp: FC<LocationHelpProps> = (props) => {
  const { location, closeDialog } = props
  const { t } = useTranslation()
  const move = useLegalMove((move) => isMoveItemType(MaterialType.AnimalCard)(move) && isSameLocationArea(move.location, location))
  const playerId = usePlayerId()
  const me = playerId === location.player
  const name = usePlayerName(location.player)
  return (
    <>
      <h2>{t(me? 'help.column.title.me': 'help.column.title', { player: name })}</h2>
      <p>
        {t('help.column')}
      </p>
      { !!move && (
        <PlayMoveButton move={move} onPlay={closeDialog}>
          {t('help.column.move')}
        </PlayMoveButton>
      )}
    </>
  )

}
