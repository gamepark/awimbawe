/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { GameDisplay } from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/awimbawe/rules/RuleId'
import { ChooseCardHeader } from './header/ChooseCardHeader'
import { ChooseStartPlayerHeader } from './header/ChooseStartPlayerHeader'
import { CheetahHeader } from './header/CheetahHeader'
import { EagleHeader } from './header/EagleHeader'
import { EndOfTurnHeader } from './header/EndOfTurnHeader'
import { PrepareNewRoundHeader } from './header/PrepareNewRoundHeader'
import { RhinocerosHeader } from './header/RhinocerosHeader'
import { SnakeHeader } from './header/SnakeHeader'
import { SolveTrickHeader } from './header/SolveTrickHeader'

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
  [RuleId.ChooseCard]: ChooseCardHeader,
  [RuleId.SolveTrick]: SolveTrickHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.PrepareNewRound]: PrepareNewRoundHeader,
  [RuleId.ChoosePlayer]: ChooseStartPlayerHeader,
  [RuleId.Cheetah]: CheetahHeader,
  [RuleId.Eagle]: EagleHeader,
  [RuleId.Rhinoceros]: RhinocerosHeader,
  [RuleId.Snake]: SnakeHeader
}
