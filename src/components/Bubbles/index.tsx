import { useRef, useEffect } from 'react'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import bubbleMapSrc from '../../assets/bubbleFalling.png'

type Position = { x: number; y: number; z: number }

type Props = {
  count?: number
}

const Bubbles = ({ count }: Props) => {
  const bubbleCount = count || 5

  const ref = useRef<THREE.InstancedMesh>()

  useEffect(() => {
    const positions: Position[] = [
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0.2, z: 1 },
      { x: 0.2, y: 0, z: 1 },
      { x: -0.2, y: 0, z: 1 },
      { x: 0, y: -0.2, z: 1 },
    ]

    const scale = 0.2

    if (ref?.current) {
      // Set positions
      for (let i = 0; i < bubbleCount; i++) {
        const temp = new THREE.Object3D()
        const id = i

        temp.scale.set(scale, scale, scale)

        const { x, y, z } = positions[i]
        temp.position.set(x, y, z)
        temp.updateMatrix()

        ref.current.setMatrixAt(id, temp.matrix)
      }

      // Update the instance
      ref.current.instanceMatrix.needsUpdate = true
    }
  }, [bubbleCount, ref])

  const Bubble = () => {
    const bubbleMapTexture = useLoader(THREE.TextureLoader, bubbleMapSrc)

    const color = new THREE.Color('#996633')
    const specular = new THREE.Color('#000000')
    const opacity = 1
    const shininess = 100

    return (
      <>
        <planeGeometry args={[1, 1]} />

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
      <instancedMesh {...{ ref }} args={[undefined, undefined, bubbleCount]}>
        <Bubble />
      </instancedMesh>
    </>
  )
}

export default Bubbles
