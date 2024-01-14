/** @jsxImportSource @emotion/react */
import {MaterialHelpProps} from '@gamepark/react-game'
import {FC} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {css} from "@emotion/react";

export const HelpCardHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t(`help.help.title`)}</h2>
      <div>
        <Trans defaults="help.help.a">
          <p css={letter}/>
          <strong/>
        </Trans>
      </div>
      <hr css={spacer}/>
      <div>
        <Trans defaults="help.help.b">
          <p css={letter}/>
          <strong/>
        </Trans>
      </div>
      <hr css={spacer} />
      <div >
        <Trans defaults="help.help.c">
          <p css={letter}/>
          <strong/>
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
