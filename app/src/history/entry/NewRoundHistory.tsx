/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { HistoryEntry } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const NewRoundHistory: FC = () => {
  const { t } = useTranslation()
  return (
    <HistoryEntry border css={newRoundStyle}>{t('history.round.new')}</HistoryEntry>
  )
}

const newRoundStyle = css`
  font-weight: bold;
`