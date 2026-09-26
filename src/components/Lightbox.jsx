import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import useOverlay from '../hooks/useOverlay.js'
import useSwipe from '../hooks/useSwipe.js'
import Chevron from './Chevron.jsx'

// Shows one image or video large, full screen, with a close button and
// left/right arrows to move through the rest of the list.
// items: [{ type: 'image' | 'video', src, alt?, poster? }]
function Lightbox({ items, index, onIndexChange, onClose }) {
  useOverlay(onClose)

  const count = items.length
  const item = items[index]
  const go = (step) => onIndexChange((index + step + count) % count)
  const swipe = useSwipe(() => go(-1), () => go(1))

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count)
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, count, onIndexChange])

  // "Portal" places the viewer directly in the page's <body>, outside every
  // other part of the site, so it always covers everything — including
  // the top bar (otherwise CLOSE could end up overlapping the nav links).
  return createPortal(
    <div className="overlay" role="dialog" aria-modal="true" {...swipe}>
      <button className="overlay__close" onClick={onClose}>
        CLOSE
      </button>

      {count > 1 && (
        <>
          <button className="arrow arrow--prev" onClick={() => go(-1)} aria-label="Previous">
            <Chevron direction="left" />
          </button>
          <button className="arrow arrow--next" onClick={() => go(1)} aria-label="Next">
            <Chevron direction="right" />
          </button>
        </>
      )}

      {/* "key" makes the media fade in fresh each time you move to another one */}
      <div className="lightbox__media" key={index}>
        {!item.src ? (
          <p className="dim">PLACEHOLDER — NO FILE YET</p>
        ) : item.type === 'video' ? (
          // silent, looping, no controls — like a moving image (never with sound)
          <video src={item.src} poster={item.poster || undefined} autoPlay muted loop playsInline />
        ) : (
          <img src={item.src} alt={item.alt || ''} />
        )}
      </div>

      {count > 1 && (
        <p className="lightbox__counter">
          {index + 1} / {count}
        </p>
      )}
    </div>,
    document.body,
  )
}

export default Lightbox
