import { Suspense, useRef } from 'react'

import {
  FaceTracker,
  ZapparCamera,
  ZapparCanvas,
  Types,
} from '@zappar/zappar-react-three-fiber'

// import Face from './components/Face'
import Bubbles from './components/Bubbles'
import Lights from './components/Lights'

function App() {
  const trackerGroup = useRef<Types.FaceAnchorGroup>()

  return (
    <ZapparCanvas>
      <ZapparCamera userFacing rearCameraMirrorMode="css" />

      <FaceTracker ref={trackerGroup as any}>
        <Suspense fallback={null}>
          <Bubbles />
        </Suspense>
      </FaceTracker>

      <Lights />
    </ZapparCanvas>
  )
}

export default App
