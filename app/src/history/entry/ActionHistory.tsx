/** @jsxImportSource @emotion/react */
import Heir from '@gamepark/awimbawe/material/Heir'
import { ActionHistoryEntry, ActionHistoryEntryProps } from '@gamepark/react-game'
import { FC } from 'react'


export const ActionHistory: FC<ActionHistoryEntryProps> = (props) => {
  const { context, children, ...rest } = props
  return (
    <ActionHistoryEntry context={context} getColor={getColor} {...rest}>
      {children}
    </ActionHistoryEntry>
  )
}

const getColor = (heir: Heir) => Heir.BlackPanther === heir? '#272c7020': '#f3ddaa20'