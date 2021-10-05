import { Types } from '@zappar/zappar-react-three-fiber'

export type BubblesProps = {
  camera: Types.Camera | undefined
  texture?: boolean
}

export type BubbleData = {
  ready: boolean
  scale: number
  velocity: THREE.Vector2
  position: THREE.Vector3
}

export type BubblePosition = { x: number; y: number; scale: number }
