/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { getCrowns } from '@gamepark/awimbawe/material/Animal'
import Heir from '@gamepark/awimbawe/material/Heir'
import { LocationType } from '@gamepark/awimbawe/material/LocationType'
import { MaterialType } from '@gamepark/awimbawe/material/MaterialType'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { PlayerPanel, SpeechBubble, SpeechBubbleDirection, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import sumBy from 'lodash/sumBy'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? 1
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<AwimbaweRules>()!

  const getPlayerCrowns = (player: Heir) => {
    if (rules.game.rule?.id === RuleId.PrepareNewRound) return 0
    const cards = rules
      .material(MaterialType.AnimalCard)
      .location((location) => location.type === LocationType.PlayerTrickStack || location.type === LocationType.PlayerHyena)
      .player(player)
      .getItems()

    return sumBy(cards, (card) => getCrowns(card.id))
  }

  return (
    <>
      {players.map((player) => (
        <PlayerPanel key={player.id} playerId={player.id} css={[panelPosition, player.id === playerId? bottomPosition: topPosition ]}>
          <div css={crowns}>{getPlayerCrowns(player.id)}</div>
          <StartPlayerChoice player={player.id} />
        </PlayerPanel>
      ))}
    </>
  )
}

const StartPlayerChoice = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const startPlayer = useRules<AwimbaweRules>()?.remind(Memory.StartPlayer)
  if (!startPlayer || startPlayer !== player) return null
  return (
    <SpeechBubble direction={SpeechBubbleDirection.TOP_LEFT} css={css`bottom: 69%`}>
      {t('rules.start.choose.me')}
    </SpeechBubble>
  )
}

const crowns = css`
  font-size: 3em;
`

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 14em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 85em;
`
