/** @jsxImportSource @emotion/react */
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import { addStylesheetUrl } from '@gamepark/react-game'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import { AwimbaweSetup } from '@gamepark/awimbawe/AwimbaweSetup'
import { AwimbaweOptionsSpec } from '@gamepark/awimbawe/AwimbaweOptions'
import { Locators } from './locator/Locators'
import { material } from './material/Material'
import { AwimbaweAnimations } from './animation/AwimbaweAnimations'

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
      animations={new AwimbaweAnimations()}
      theme={{
        root: {
          background: {
            overlay: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
