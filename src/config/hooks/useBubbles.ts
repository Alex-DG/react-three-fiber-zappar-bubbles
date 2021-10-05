import { BubbleData } from '../types'

/**
 * Hook in charge of the falling animation
 */
const useBubbles = () => {
  const speed = 4.5

  const update = (
    dt: number,
    targetY: number,
    data: BubbleData,
    bubble: any
  ) => {
    const { velocity, position } = data

    const posX = Math.sin(bubble.position.y * position.y * 1.5) * 0.15 * dt
    const posY = velocity.y * (speed / 2) * 0.008

    // bubble is Falling
    if (bubble.position.y > targetY) {
      bubble.position.x += posX
      bubble.position.y += posY
    }

    // Reset bubble position
    if (bubble.position.y < targetY) {
      bubble.position.set(position.x, position.y, position.z)
    }
  }

  return { update }
}

export default useBubbles
