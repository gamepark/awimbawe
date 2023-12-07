/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const HeirCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const { t } = useTranslation()
  const hasWinARound = item.location?.rotation
  const playerName = usePlayerName(item.id)
  const playerId = usePlayerId()
  return (
    <>
      <h2>{t(`help.heir.title`, { type: t(`player.${item.id}`)})}</h2>
      <p>{ t(playerId === item.id? `help.heir.own.me`: 'help.heir.own', { player: playerName }) }</p>
      { hasWinARound && (
        <>
          <hr />
          <p>{t(playerId === item.id? `help.heir.win-round.me`: 'help.heir.win-round',  { player: playerName })}</p>
        </>
      ) }
    </>
  )
}
