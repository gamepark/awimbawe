import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialMove, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { getHistoryCard } from '../../material/animal-types'
import { placeStyle, rulesLinkButton } from './ChooseCardHistory'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const RhinoPassHistory = ({ context }: MoveComponentProps<MaterialMove>) => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = playerId && actionPlayer === playerId
  const name = usePlayerName(actionPlayer)
  return <>{t(itsMe ? 'history.rhino.pass.me' : 'history.rhino.pass', { player: name })}</>
}

export const RhinocerosHistory = ({ move, context }: MoveComponentProps<MoveItem>) => {
  const { game } = context
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const actionPlayer = context.action.playerId
  const playerName = usePlayerName(actionPlayer)
  const opponent = game.players.find((p: number) => p !== actionPlayer)
  const opponentName = usePlayerName(opponent)
  const itsMe = playerId && actionPlayer === playerId
  const item = game.items[MaterialType.AnimalCard]![move.itemIndex]
  const itemId = (move.reveal?.id ?? item.id) as number
  const card = t(getHistoryCard(itemId))

  if (playerId && opponent === playerId) {
    return (
      <Trans css={placeStyle} i18nKey="history.rhino.move.other.me" values={{ card: card, player: playerName }}>
        <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local />
      </Trans>
    )
  }

  return (
    <Trans
      css={placeStyle}
      i18nKey={itsMe ? 'history.rhino.move.me' : 'history.rhino.move'}
      values={{ card: card, player: playerName, opponent: opponentName }}
    >
      <PlayMoveButton css={rulesLinkButton} move={displayMaterialHelp(MaterialType.AnimalCard, { id: itemId })} local />
    </Trans>
  )
}
