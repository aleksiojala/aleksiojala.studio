import { useCallback, useMemo, useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'

// A film's own page (e.g. /films/ready-to-die), opened with VIEW:
// a heading, the Vimeo film, and one row of small thumbnails below it.
// On desktop it all fits on one screen; see .film in index.css.
function FilmProject({ film, filmIndex, navigate }) {
  const images = useMemo(
    () => film.images.map((src) => ({ type: 'image', src, alt: film.title })),
    [film],
  )
  // Which image is open in the full-screen viewer. null = closed.
  const [openIndex, setOpenIndex] = useState(null)
  const closeViewer = useCallback(() => setOpenIndex(null), [])

  // Goes back to the Films slider, on this film's slide.
  const close = (event) => {
    event.preventDefault()
    navigate('/', { film: filmIndex })
  }

  // Tells the styles how many thumbnails there are, so the video and the
  // thumbnail row can be sized together to fit the window height.
  const layout = {
    '--count': images.length,
    // each thumbnail is 2/3 as tall as it is wide, and the row is split into --count
    '--thumbs-height': images.length > 0 ? 2 / 3 / images.length : 0,
  }

  return (
    <main className="page project">
      <div className="film" style={layout}>
        {/* the heading on the left, CLOSE on the right, on the same line */}
        <div className="film__top">
          <h1 className="film__heading">
            {film.artist ? `${film.artist} — ${film.title}` : film.title}
          </h1>
          <a className="project__close" href="/" data-text="CLOSE" onClick={close}>
            CLOSE
          </a>
        </div>

        {/* "key" starts each film with its cover showing again */}
        {film.vimeoId && (
          <FilmVideo key={film.slug} film={film} />
        )}

        {images.length > 0 && (
          <div className="film__thumbs">
            {images.map((image, i) => (
              <button
                key={image.src}
                className="film__thumb"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open image ${i + 1}`}
              >
                <img src={image.src} alt={image.alt} />
              </button>
            ))}
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeViewer}
        />
      )}
    </main>
  )
}

// The Vimeo film. If the film has a cover image, the cover (with PLAY)
// is shown first, and the Vimeo player only loads once it's clicked —
// so the page itself loads faster.
function FilmVideo({ film }) {
  const [playing, setPlaying] = useState(!film.cover)

  return (
    <div className="film__video">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${film.vimeoId}?title=0&byline=0&portrait=0&dnt=1${film.cover ? '&autoplay=1' : ''}`}
          title={film.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="film__cover" onClick={() => setPlaying(true)} aria-label={`Play ${film.title}`}>
          <img src={film.cover} alt="" />
          <span className="play" data-text="PLAY">PLAY</span>
        </button>
      )}
    </div>
  )
}

export default FilmProject
