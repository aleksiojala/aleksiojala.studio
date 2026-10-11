import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { artDirection, films, site } from './content.js'
import { hasFilmPage } from './utils.js'
import Header from './components/Header.jsx'
import Films from './pages/Films.jsx'
import FilmProject from './pages/FilmProject.jsx'
import ArtDirection from './pages/ArtDirection.jsx'
import About from './pages/About.jsx'

// Each web address (path) shows one page.
// theme: 'dark' = black background, white text. 'light' = white background, black text.
// (The colours themselves are set at the top of index.css.)
// subtitle: optional line under the name in the top bar.
// overVideo: the top bar floats see-through on top of the page (Films slider).
const PAGES = {
  '/': { component: Films, title: '', theme: 'dark', overVideo: true },
  '/films': { component: Films, title: '', theme: 'dark', overVideo: true },
  '/art-direction': {
    component: ArtDirection,
    title: 'ART DIRECTION',
    theme: 'light',
    subtitle: artDirection.subtitle,
  },
  '/about': { component: About, title: 'ABOUT', theme: 'light' },
}

// Finds the page for an address. Film pages are made from the films list:
// /films/ready-to-die → the film whose slug is 'ready-to-die'.
function findPage(path) {
  const filmIndex = films.findIndex((film) => hasFilmPage(film) && `/films/${film.slug}` === path)
  if (filmIndex !== -1) {
    const film = films[filmIndex]
    return { component: FilmProject, title: film.title, theme: 'light', props: { film, filmIndex } }
  }
  // Unknown addresses fall back to the Films page.
  return PAGES[path] || PAGES['/']
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  // Keep the page in sync when the browser's back/forward buttons are used.
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const page = useMemo(() => findPage(path), [path])
  const Page = page.component

  // "LayoutEffect" runs before the page is drawn on screen, so a light page
  // never flashes dark first when it's opened directly.
  useLayoutEffect(() => {
    document.title = page.title ? `${site.name} — ${page.title}` : site.name
    // Switches the colours for the whole screen, including the top bar.
    document.documentElement.dataset.theme = page.theme
    // Colours the phone's status bar to match.
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', page.theme === 'light' ? '#ffffff' : '#0a0a0a')
  }, [page])

  // Change page without reloading the whole site.
  // state: optional extra info for the next page (e.g. which film slide to show).
  const navigate = (to, state = null) => {
    if (to === path) return
    window.history.pushState(state, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Header
        path={path}
        navigate={navigate}
        subtitle={page.subtitle}
        overVideo={page.overVideo}
      />
      <Page navigate={navigate} {...page.props} />
    </>
  )
}

export default App
