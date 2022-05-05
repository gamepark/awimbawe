/** @jsxImportSource @emotion/react */
import { PlayerView } from '@gamepark/awimbawe/GameView'
import PlayerHand from './PlayerHand'
import PlayerPiles from './PlayerPiles'

type Props = {
    player: PlayerView
    top?: boolean
}

export default function PlayerDisplay({ player, top }: Props) {

    return (
        <>

            <PlayerHand player={player}
                top={top} />

            <PlayerPiles top={top} piles={player.piles} />
        </>
    )
}








