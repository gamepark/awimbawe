/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { HistoryEntry } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EndGameHistory: FC = () => {
  const { t } = useTranslation()
  return (
    <HistoryEntry css={endOfGameStyle}>{t('history.game.end')}</HistoryEntry>
  )
}

const endOfGameStyle = css`
  color: grey;
  text-align: center;
  font-style: italic
`