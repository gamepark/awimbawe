import { AwimbaweOptionsSpec } from '@gamepark/awimbawe/AwimbaweOptions'
import { AwimbaweRules } from '@gamepark/awimbawe/AwimbaweRules'
import { AwimbaweSetup } from '@gamepark/awimbawe/AwimbaweSetup'
import { addStylesheetUrl, GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { awimbaweAnimations } from './animation/AwimbaweAnimations'
import { AwimbaweHistory } from './history/AwimbaweHistory'
import { Locators } from './locator/Locators'
import { material } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'

addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="awimbawe"
      GameSetup={AwimbaweSetup}
      Rules={AwimbaweRules}
      optionsSpec={AwimbaweOptionsSpec}
      material={material}
      locators={Locators}
      animations={awimbaweAnimations}
      logs={new AwimbaweHistory()}
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
      <App />
    </GameProvider>
  </StrictMode>
)
