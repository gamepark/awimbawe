/** @jsxImportSource @emotion/react */
import {addStylesheetUrl, GameProvider, setupTranslation} from '@gamepark/react-game'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'
import AwimbaweRules from '@gamepark/awimbawe/AwimbaweRules'
import {AwimbaweSetup} from '@gamepark/awimbawe/AwimbaweSetup'
import {AwimbaweOptionsSpec} from '@gamepark/awimbawe/AwimbaweOptions'
import {Locators} from './locator/Locators'
import {material} from './material/Material'
import {awimbaweAnimations} from './animation/AwimbaweAnimations'
import {Tutorial} from './tutorial/Tutorial'

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
      tutorial={new Tutorial()}
      theme={{
        root: {
          background: {
            overlay: 'rgba(0, 0, 0, 0.5)'
          }
        },
        dropArea: {
          backgroundColor: 'rgba(116, 127, 201, 0.5)'
        }
      }}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
