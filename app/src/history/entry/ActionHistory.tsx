/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { ActionHistoryEntry, ActionHistoryEntryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { playerColor } from '../../panels/PlayerPanels'


export const ActionHistory: FC<ActionHistoryEntryProps> = (props) => {
  const { context, children, ...rest } = props
  return (
    <ActionHistoryEntry context={context} getColor={getColor} {...rest}>
      {children}
    </ActionHistoryEntry>
  )
}


export const getColor = (heir: Heir) => playerColor[heir] + '20'