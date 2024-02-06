/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const NewRoundHistory: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={newRoundStyle}>{t('history.round.new')}</div>
  )
}

const newRoundStyle = css`
  font-weight: bold;
`