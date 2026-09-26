import { useRef } from 'react'

// How far (in pixels) a finger must swipe on a phone to count as a swipe.
const SWIPE_DISTANCE = 50

// Returns touch handlers that call onPrevious (swipe right) or onNext (swipe left).
function useSwipe(onPrevious, onNext) {
  const startX = useRef(null)

  return {
    onTouchStart: (event) => {
      startX.current = event.touches[0].clientX
    },
    onTouchEnd: (event) => {
      if (startX.current === null) return
      const distance = event.changedTouches[0].clientX - startX.current
      if (distance > SWIPE_DISTANCE) onPrevious()
      if (distance < -SWIPE_DISTANCE) onNext()
      startX.current = null
    },
  }
}

export default useSwipe
