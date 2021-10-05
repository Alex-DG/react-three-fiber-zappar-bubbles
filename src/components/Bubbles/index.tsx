import { useRef } from 'react'

import * as THREE from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Instance, Instances } from '@react-three/drei'
import * as ZapparThree from '@zappar/zappar-threejs'

import bubbleMapSrc from '../../assets/bubbleFalling.png'

import { BubbleData, BubblesProps } from '../../config/types'

import positions from '../../config/data/bubblePositions'
import useBubbles from '../../config/hooks/useBubbles'

const Bubbles = ({ camera, texture }: BubblesProps) => {
  const { gl } = useThree()
  const { update } = useBubbles()
  const env = new ZapparThree.CameraEnvironmentMap() // zappar-react-three-fiber possible?

  const groupRef = useRef<THREE.Group>()
  const bubbleRef = useRef<any[]>([])
  const data = useRef<BubbleData[]>([]) // used to store initial values

  /**
   * Bubble with 2d texture or as a sphere
   */
  const Bubble = () => {
    const bubbleMapTexture = useLoader(THREE.TextureLoader, bubbleMapSrc)

    const props = texture
      ? {
          color: new THREE.Color('#996633'),
          specular: new THREE.Color('#000000'),
          opacity: 1,
          shininess: 100,
        }
      : {
          metalness: 0.9,
          roughness: 0.3,
          envMap: env.environmentMap,
          transparent: true,
          opacity: 0.35,
          color: new THREE.Color('#f0e692'),
        }

    return (
      <>
        {texture ? (
          <>
            <planeGeometry />

            <meshPhongMaterial
              {...props}
              attach="material"
              map={bubbleMapTexture}
              depthTest={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              transparent
            />
          </>
        ) : (
          <>
            <sphereBufferGeometry args={[0.3, 16, 12]} />
            <meshStandardMaterial {...props} />
          </>
        )}
      </>
    )
  }

  /**
   * Instances generation
   */
  const generate = () => {
    const pixelRatio = Math.min(window.devicePixelRatio, 2)

    return (
      <>
        {positions.map((position, key) => {
          // :: Set bubble property ::
          let props = {
            ready: false,
            scale: 0,
            velocity: new THREE.Vector2(),
            position: new THREE.Vector3(),
          }

          // ::: Set velocity :::
          props.velocity.set(
            Math.floor(Math.random() * 6 - 3) * 0.1,
            Math.floor(Math.random() * 10 + 5) * -0.05
          )

          // ::: Set scale :::
          const magic = pixelRatio === 2 ? 0.4 : 0.8
          const scale = pixelRatio * position.scale * magic
          props.scale = scale

          // ::: Set position :::
          props.position.set(
            position.x,
            Math.random() * (3.5 - 1.5) + 1.3,
            Math.random() * (0.4 - 0.05) + 0.05
          )

          data.current.push(props)

          return (
            <Instance
              {...{ scale, key }}
              ref={(ref) => {
                bubbleRef.current.push(ref)
              }}
              position={[props.position.x, props.position.y, props.position.z]}
            />
          )
        })}
      </>
    )
  }

  /**
   * Animation loop
   */
  useFrame((_, dt) => {
    camera && env.update(gl, camera)

    bubbleRef?.current.forEach((bubble, index) => {
      if (bubble?.position) {
        const props = data.current[index]
        const targetY = positions[index]?.y

        update(dt, targetY, props, bubble)
      }
    })
  })

  return (
    <group ref={groupRef}>
      <Instances>
        <Bubble />

        {generate()}
      </Instances>
    </group>
  )
}

export default Bubbles
