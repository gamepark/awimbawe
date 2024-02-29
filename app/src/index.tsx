/** @jsxImportSource @emotion/react */
import { AwimbaweRules, AwimbaweSetup } from '@gamepark/awimbawe'
import { AwimbaweOptionsSpec } from '@gamepark/awimbawe/AwimbaweOptions'
import { addStylesheetUrl, GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { awimbaweAnimations } from './animation/AwimbaweAnimations'
import App from './App'
import { AwimbaweHistory } from './history/AwimbaweHistory'
import { Locators } from './locator/Locators'
import { material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

ReactDOM.render(
  <StrictMode>
    <GameProvider 
      game="awimbawe"
      GameSetup={AwimbaweSetup}
      Rules={AwimbaweRules}
      optionsSpec={AwimbaweOptionsSpec}
      material={material}
      locators={Locators}
      animations={awimbaweAnimations}
      MaterialHistory={AwimbaweHistory}
      tutorial={new Tutorial()}
      theme={{
        root: {
          background: {
            overlay: 'rgba(0, 0, 0, 0.5)'
          }
        },
        dropArea: {
          backgroundColor: 'rgba(116, 127, 201, 0.7)'
        }
      }}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
