import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import { Instance, Instances } from '@react-three/drei'

import bubbleMapSrc from '../../assets/bubbleFalling.png'

type Position = { x: number; y: number; z: number }

type Props = {
  count?: number
}

/**
 * Alternatives solution to `index.tsx`
 * using drei.
 *
 * Results:
 *  - in terms of line of code, shorter
 *  - no need of extra logic: ref, useEffect
 */
const Bubbles = ({ count }: Props) => {
  const bubbleCount = count || 5

  const positions: Position[] = [
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0.2, z: 1 },
    { x: 0.2, y: 0, z: 1 },
    { x: -0.2, y: 0, z: 1 },
    { x: 0, y: -0.2, z: 1 },
  ]

  const scale = 0.2

  const Bubble = () => {
    const bubbleMapTexture = useLoader(THREE.TextureLoader, bubbleMapSrc)

    const color = new THREE.Color('#996633')
    const specular = new THREE.Color('#000000')
    const opacity = 1
    const shininess = 100

    return (
      <>
        <planeGeometry />

        <meshPhongMaterial
          {...{ color, specular, opacity, shininess }}
          attach="material"
          map={bubbleMapTexture}
          depthTest={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          transparent
        />
      </>
    )
  }

  return (
    <>
      <Instances>
        <Bubble />

        {positions.map(({ x, y, z }, i) => (
          <Instance {...{ scale }} position={[x, y, z]} />
        ))}
      </Instances>
    </>
  )
}

export default Bubbles
