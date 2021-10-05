import { useRef, useEffect } from 'react'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { Types } from '@zappar/zappar-react-three-fiber'

import bubbleMapSrc from '../../assets/bubbleFalling.png'

import positions from '../../config/data/bubblePositions'

type Props = {
  trackerGroup: React.MutableRefObject<Types.FaceAnchorGroup | undefined>
}

type BubbleData = {
  ready: boolean
  scale: number
  velocity: THREE.Vector2
  position: THREE.Vector3
}

/**
 * Alternative solution:
 *  - solution without drei Instances/Instance not sure yet how to access each child within
 * the InstancedMesh to update their falling speed individually
 */
const Bubbles = ({ trackerGroup }: Props) => {
  const bubbleCount = positions.length

  const groupRef = useRef<THREE.Group>()
  const instancedMeshRef = useRef<THREE.InstancedMesh>()
  const bubbleData = useRef<BubbleData[]>([]) // used to store initial values

  /**
   * Generate bubbles
   */
  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 2)

    if (instancedMeshRef?.current && groupRef?.current) {
      for (let i = 0; i < bubbleCount; i++) {
        const temp = new THREE.Object3D()
        const id = i

        let data = {
          ready: false,
          scale: 0,
          velocity: new THREE.Vector2(),
          position: new THREE.Vector3(),
        }

        // ::: Set velocity :::
        data.velocity.set(
          Math.floor(Math.random() * 6 - 3) * 0.1,
          Math.floor(Math.random() * 10 + 5) * -0.05
        )

        // ::: Set scale :::
        const scale = pixelRatio * positions[i].scale * 0.32
        temp.scale.set(scale, scale, scale)
        data.scale = scale

        // ::: Set position :::
        const x = positions[i].x
        const y = Math.random() * (3.5 - 1.5) + 1.3
        const z = Math.random() * (0.4 - 0.05) + 0.05
        temp.position.set(x, y, z)
        temp.updateMatrix()
        data.position.set(x, y, z)

        instancedMeshRef.current.setMatrixAt(id, temp.matrix)
        bubbleData.current.push(data)
      }

      trackerGroup.current?.add(groupRef.current)

      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [bubbleCount, instancedMeshRef, trackerGroup])

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

  // useFrame((_, dt) => {})

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, bubbleCount]}
      >
        <Bubble />
      </instancedMesh>
    </group>
  )
}

export default Bubbles
