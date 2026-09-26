import { useCallback, useEffect, useState } from 'react'
import { films } from '../content.js'
import { hasFilmPage } from '../utils.js'
import useSwipe from '../hooks/useSwipe.js'
import Chevron from '../components/Chevron.jsx'

function Films({ navigate }) {
  // Start on the slide we came back to (e.g. from a film page), or the first one.
  const [index, setIndex] = useState(() => {
    const saved = window.history.state?.film
    return saved >= 0 && saved < films.length ? saved : 0
  })

  const count = films.length
  const film = films[index]

  // Remember the current slide in the browser history, so the browser's
  // back button also returns to the right slide.
  useEffect(() => {
    window.history.replaceState({ ...window.history.state, film: index }, '')
  }, [index])

  // VIEW opens the film's own page (video + thumbnails).
  const openFilmPage = (event) => {
    event.preventDefault()
    navigate(`/films/${film.slug}`)
  }

  // Step forward (+1) or back (-1), wrapping around at the ends.
  const go = useCallback((step) => {
    setIndex((i) => (i + step + count) % count)
  }, [count])

  const swipe = useSwipe(() => go(-1), () => go(1))

  // Keyboard: left/right arrows change slide.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go])

  if (count === 0) {
    return <main className="page page--center"><p className="dim">NO FILMS YET</p></main>
  }

  return (
    <main className="films" {...swipe}>
      {/* "key" makes the background restart (and fade in) on every slide change */}
      <Background key={index} film={film} />

      {hasFilmPage(film) && (
        <div className="slide-actions">
          <a className="play" href={`/films/${film.slug}`} onClick={openFilmPage}>
            VIEW
          </a>
        </div>
      )}

      {count > 1 && (
        <>
          <button className="arrow arrow--prev" onClick={() => go(-1)} aria-label="Previous film">
            <Chevron direction="left" />
          </button>
          <button className="arrow arrow--next" onClick={() => go(1)} aria-label="Next film">
            <Chevron direction="right" />
          </button>
        </>
      )}

      <div className="slide-info" key={`info-${index}`}>
        {film.type && <p className="slide-info__type">{film.type}</p>}
        <h2 className="slide-info__title">{film.title}</h2>
        {film.description && <p className="slide-info__description">{film.description}</p>}
      </div>

      <p className="counter">
        {index + 1} / {count}
      </p>
    </main>
  )
}

// The full-screen looping video (or image / plain black while there's no video yet).
// Only the current slide's video is loaded, to keep bandwidth low.
function Background({ film }) {
  if (film.backgroundVideo) {
    return (
      <div className="slide-bg">
        <video
          src={film.backgroundVideo}
          poster={film.slide || undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    )
  }
  if (film.slide) {
    return (
      <div className="slide-bg">
        <img src={film.slide} alt="" />
      </div>
    )
  }
  return <div className="slide-bg slide-bg--empty" />
}

export default Films
