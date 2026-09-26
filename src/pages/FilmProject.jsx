import { useCallback, useMemo, useState } from 'react'
import Lightbox from '../components/Lightbox.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'

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

  // Hover preview (computers only, not phones/tablets): the thumbnail the
  // mouse is over is shown in the big video box. null = show the cover.
  const canHover = useMediaQuery('(hover: hover) and (min-width: 701px)')
  const [preview, setPreview] = useState(null)

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
      <div className="project__bar">
        <a className="project__close" href="/" onClick={close}>
          CLOSE
        </a>
      </div>

      <div className="film" style={layout}>
        <h1 className="film__heading">
          {film.artist ? `${film.artist} — ${film.title}` : film.title}
        </h1>

        {/* "key" starts each film with its cover showing again */}
        {film.vimeoId && (
          <FilmVideo key={film.slug} film={film} images={images} preview={canHover ? preview : null} />
        )}

        {images.length > 0 && (
          <div className="film__thumbs" onMouseLeave={() => setPreview(null)}>
            {images.map((image, i) => (
              <button
                key={image.src}
                className="film__thumb"
                onClick={() => setOpenIndex(i)}
                onMouseEnter={() => setPreview(image.src)}
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
// While the cover is showing, "preview" (a thumbnail being hovered) fades
// in on top of it. Once the video plays, previews are no longer shown.
function FilmVideo({ film, images, preview }) {
  const [playing, setPlaying] = useState(!film.cover)

  return (
    // while a still is previewed, the cover and the box's black background are hidden
    <div className={`film__video${!playing && preview ? ' is-previewing' : ''}`}>
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${film.vimeoId}?title=0&byline=0&portrait=0&dnt=1${film.cover ? '&autoplay=1' : ''}`}
          title={film.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="film__cover" onClick={() => setPlaying(true)} aria-label={`Play ${film.title}`}>
          <img className="film__cover-image" src={film.cover} alt="" />
          {/* every thumbnail image, stacked and invisible; the hovered one fades in,
              whole and uncropped, whatever its shape */}
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt=""
              className={`film__preview${image.src === preview ? ' is-visible' : ''}`}
            />
          ))}
          <span className="play">PLAY</span>
        </button>
      )}
    </div>
  )
}

export default FilmProject
