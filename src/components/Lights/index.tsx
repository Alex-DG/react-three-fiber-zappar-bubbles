import * as THREE from 'three'

const Lights = () => {
  const ambientColor = new THREE.Color('#f0e692')
  const pointColor = new THREE.Color('#ffffff')

  return (
    <>
      <ambientLight intensity={1.0} color={ambientColor} />
      <pointLight intensity={1.39} color={pointColor} position={[0, 1.4, 4]} />
    </>
  )
}

export default Lights
