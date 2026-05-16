import { useTranslation } from 'react-i18next'

export const EndGameHistory = () => {
  const { t } = useTranslation()
  return <>{t('history.game.over')}</>
}
