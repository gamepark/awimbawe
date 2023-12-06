/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const EndOfTurnHeader = () => {
  const { t } = useTranslation()

  return <>{t('header.end-turn')}</>
}
