/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AwimbaweRules } from '@gamepark/awimbawe/AwimbaweRules'
import Heir from '@gamepark/awimbawe/material/Heir'
import { EagleChoice } from '@gamepark/awimbawe/rules/CustomMoveType'
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
        <PlayerPanel activeRing key={player.id} playerId={player.id} color={playerColor[player.id]}
                     css={[panelPosition, player.id === (playerId ?? rules.players[0]) ? bottomPosition : topPosition]}>
          <StartPlayerChoice player={player.id}/>
          <EaglePlayerChoice player={player.id}/>
        </PlayerPanel>
      ))}
    </>
  )
}

const StartPlayerChoice = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const rules = useRules<AwimbaweRules>()!
  const startPlayer = rules?.remind(Memory.StartPlayer)
  const actionPlayer = rules?.remind(Memory.CheetahPlayer)
  const isPlayerTurn = !actionPlayer || startPlayer === actionPlayer
  if (!startPlayer || player !== (actionPlayer ?? startPlayer)) return null
  return (
    <SpeechBubble direction={SpeechBubbleDirection.TOP_LEFT}>
      {t(isPlayerTurn ? 'rules.start.choose.me' : 'rules.start.choose.you')}
    </SpeechBubble>
  )
}

const EaglePlayerChoice = ({ player }: { player: number }) => {
  const { t } = useTranslation()
  const rules = useRules<AwimbaweRules>()!
  const choice = rules.remind(Memory.Eagle)
  const actionPlayer = rules?.remind(Memory.EaglePlayer)
  if (choice === undefined || player !== actionPlayer) return null
  return (
    <SpeechBubble direction={SpeechBubbleDirection.TOP_LEFT}>
      {t(choice === EagleChoice.Attack ? 'rules.eagle.attack' : 'rules.eagle.runaway')}
    </SpeechBubble>
  )
}

const panelPosition = css`
  position: absolute;
  right: 1em;
  width: 28em;
  height: 8.3em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 3em 1.5em 1.5em 3.2em;
`

const topPosition = css`
  top: 8.5em;
`

const bottomPosition = css`
  top: 90em;
`


export const playerColor = {
  [Heir.BlackPanther]: '#272c70',
  [Heir.WhiteTiger]: '#f3ddaa'
}