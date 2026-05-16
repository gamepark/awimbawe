import { css } from '@emotion/react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const HelpCardHelp = (_: MaterialHelpProps) => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t(`help.help.title`)}</h2>
      <div>
        <Trans i18nKey="help.help.a">
          <p css={letter} />
          <strong />
        </Trans>
      </div>
      <hr css={spacer} />
      <div>
        <Trans i18nKey="help.help.b">
          <p css={letter} />
          <strong />
        </Trans>
      </div>
      <hr css={spacer} />
      <div>
        <Trans i18nKey="help.help.c">
          <p css={letter} />
          <strong />
        </Trans>
      </div>
    </>
  )
}

export const letter = css`
  color: green;
  font-weight: bold;
  font-style: italic;
`

export const spacer = css`
  margin-top: 2em;
  margin-bottom: 2em;
`
