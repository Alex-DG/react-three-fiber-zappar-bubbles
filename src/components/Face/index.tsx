import React from 'react'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { FaceBufferGeometry, Types } from '@zappar/zappar-react-three-fiber'

import faceMapSrc from '../../assets/faceMeshTemplate.png'

type Props = {
  trackerGroup: React.MutableRefObject<Types.FaceAnchorGroup | undefined>
}

/**
 * Face with mask texture
 */
const Face = ({ trackerGroup }: Props) => {
  const faceMapTexture = useLoader(TextureLoader, faceMapSrc)

  return (
    <mesh>
      <meshStandardMaterial transparent map={faceMapTexture} />
      <FaceBufferGeometry trackerGroup={trackerGroup} />
    </mesh>
  )
}

export default Face
