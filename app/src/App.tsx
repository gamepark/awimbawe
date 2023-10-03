/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { GameDisplay } from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'

export default function App() {
  const game = useGame<MaterialGame>()
  const [imagesLoading, setImagesLoading] = useState(true)
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || imagesLoading || isJustDisplayed
  return (
    <>
      <GameDisplay/>
      <LoadingScreen display={loading} author="Mathieu Roussel" artist="Aubane Rittano" publisher="Explor8" developer="Teddy Campagne"/>
      <MaterialHeader GameOver={() => <>GameOver</>} rulesStepsHeaders={RulesHeaders} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<any, any> = {
  [RuleId.ChooseCard]: () => <>ChooseCard</>,
  [RuleId.SolveTrick]: () => <>SolveTrick</>,
  [RuleId.EndOfTurn]: () => <>EndOfTurn</>,
}