/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { Memory } from '@gamepark/awimbawe/rules/Memory'
import { PlayerPanel, SpeechBubble, SpeechBubbleDirection, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId()
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<AwimbaweRules>()!
  return (
    <>
      {players.map((player) => (
        <PlayerPanel activeRing key={player.id} playerId={player.id} css={[panelPosition, player.id === (playerId ?? rules.players[0])? bottomPosition: topPosition ]}>
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
    <SpeechBubble direction={SpeechBubbleDirection.TOP_LEFT}>
      {t('rules.start.choose.me')}
    </SpeechBubble>
  )
}

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 6.7em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 3em 1.5em 1.5em 3.2em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 85em;
`
