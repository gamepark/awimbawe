/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const EndGameHistory: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={endOfGameStyle}>{t('history.game.end')}</div>
  )
}

const endOfGameStyle = css`
  color: grey;
  text-align: center;
  font-style: italic
`