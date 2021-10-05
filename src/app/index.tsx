import { Suspense, useRef } from 'react'

import {
  FaceTracker,
  ZapparCamera,
  ZapparCanvas,
  Types,
} from '@zappar/zappar-react-three-fiber'

import Face from '../components/Face'
import Bubbles from '../components/Bubbles'
import Lights from '../components/Lights'

const App = () => {
  const camRef = useRef<Types.Camera>()
  const trackerGroup = useRef<Types.FaceAnchorGroup>()

  const showMask = false

  return (
    <ZapparCanvas>
      <ZapparCamera ref={camRef} userFacing rearCameraMirrorMode="css" />

      <FaceTracker ref={trackerGroup as any}>
        <Suspense fallback={null}>
          {showMask && <Face {...{ trackerGroup }} />}
          <Bubbles camera={camRef.current} texture />
        </Suspense>
      </FaceTracker>

      <Lights />
    </ZapparCanvas>
  )
}

export default App
