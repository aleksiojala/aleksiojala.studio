import { useEffect, useRef } from 'react'

// How quickly the label catches up with the mouse each frame
// (1 = sticks to it exactly, lower = glides behind it more softly).
const EASE = 0.3

// A small text label (e.g. "VIEW") that follows the mouse pointer smoothly.
// It always follows the mouse, but is only shown while `visible` is true.
// Desktop only (computers with a mouse). Styles: .cursor-label in index.css.
function CursorLabel({ visible, children }) {
  const labelRef = useRef(null)

  useEffect(() => {
    const label = labelRef.current
    let target = null // where the mouse is
    let position = null // where the label is now
    let frame = 0

    // Moves the label a part of the way towards the mouse, once per screen
    // refresh, until it has caught up. Uses "transform", which the graphics
    // card handles, so it stays smooth.
    const step = () => {
      position.x += (target.x - position.x) * EASE
      position.y += (target.y - position.y) * EASE
      label.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
      const done = Math.abs(target.x - position.x) < 0.1 && Math.abs(target.y - position.y) < 0.1
      frame = done ? 0 : requestAnimationFrame(step)
    }

    const onMove = (event) => {
      target = { x: event.clientX, y: event.clientY }
      if (!position) position = { ...target } // the very first time: start right at the mouse
      if (!frame) frame = requestAnimationFrame(step)
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={labelRef} className={visible ? 'cursor-label is-visible' : 'cursor-label'} aria-hidden="true">
      {children}
    </div>
  )
}

export default CursorLabel
