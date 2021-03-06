/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { getPlayerName } from '@gamepark/awimbawe/AwimbaweOptions'
import { PlayerView } from '@gamepark/awimbawe/GameView'
import Heir from '@gamepark/awimbawe/Heir'
import { Avatar, GamePoints, PlayerTimer, usePlayer, usePlayerId } from '@gamepark/react-client'
import { useTranslation } from 'react-i18next'
import HeirCard from './material/HeirCard'
import PileDropArea from './PileDropArea'
import PlayerHand from './PlayerHand'
import PlayerPiles from './PlayerPiles'
import PlayerTricks from './PlayerTricks'
import { headerHeight } from './styles'


type Props = {

    heir : Heir
    player: PlayerView
    top?: boolean
    isActive: boolean
    canMovePile?: boolean
    canBlock?: boolean
}

export default function PlayerDisplay({ player, top, heir, isActive, canMovePile = false, canBlock}: Props) {
    const info = usePlayer(heir)
    const {t} = useTranslation()
    const playerId = usePlayerId<Heir>()
    return (
        <>
            <HeirCard css={top ? topPlayerHeir : bottomPlayerHeir} heir={heir}/>

            <PlayerHand player={player}
                top={top}
                canDrag={isActive && playerId===heir && !player.pendingPower}
                canBlock={canBlock}
                />

            <PlayerPiles top={top} piles={player.piles} draggable={canMovePile || (isActive && playerId===heir && !player.pendingPower)} canBlock={canBlock} />

            {canMovePile && player.piles.map((_,pileIndex) => <PileDropArea pileIndex={pileIndex} key={pileIndex} />)}
            

            <PlayerTricks top={top} tricks={player.tricks}/> 

            <div css={[playerInfoCss, top ? topPlayerPosition : bottomPlayerPosition]} >
                <Avatar playerId={heir} css={avatarCss} />
                <h3 css={titleStyle}>
                    <span css={nameStyle}>{info?.name ?? getPlayerName(heir, t)}</span>
                    <PlayerTimer playerId={heir} css={css`flex-shrink: 0`} />
                    <GamePoints playerId={heir} css={css`flex-shrink: 0`} />
                </h3>
            </div>
        </>


    )
}


const playerInfoCss = css`
  position: absolute;
  height: 5em;
  width: 28em;
  background: green;

`

const bottomPlayerPosition = css`
  left: 45em;
  bottom: 1em;
`

const topPlayerPosition = css`
  right: 45em;
  top: ${headerHeight + 1}em;
`

const bottomPlayerHeir = css`
  bottom: 1.5em;
  left: 1.5em;
  z-index: 1;
`

const topPlayerHeir = css`
  top: ${1.5 + headerHeight}em;
  right: 1.5em;
  transform: rotateZ(180deg);
  z-index: 1;
`

const avatarCss = css`
  position: absolute;
  width: 5em;
  height: 5em;
`

const titleStyle = css`
  color: white;
  position: absolute;
  top: 0.25em;
  left: 2.5em;
  right: 0.5em;
  margin: 0;
  font-size: 2.9em;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`

const nameStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`





