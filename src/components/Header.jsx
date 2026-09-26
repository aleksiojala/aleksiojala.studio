import { useLayoutEffect, useRef } from 'react'
import { site } from '../content.js'
import CityClocks from './CityClocks.jsx'

// isActive: when the link is shown as the current page.
// FILMS is also active on the film project pages (/films/…).
const LINKS = [
  { label: 'FILMS', to: '/', isActive: (path) => path === '/' || path.startsWith('/films') },
  { label: 'ART DIRECTION', to: '/art-direction', isActive: (path) => path === '/art-direction' },
  { label: 'ABOUT', to: '/about', isActive: (path) => path === '/about' },
]

function Header({ path, navigate, subtitle, overVideo }) {
  const headerRef = useRef(null)

  // Measures how tall the top bar is (it's taller when there's a subtitle,
  // and on narrow screens) and shares it with the styles as --header-height,
  // so pages can start right below it.
  useLayoutEffect(() => {
    const header = headerRef.current
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
    })
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Normal links, but handled by the site so the page doesn't fully reload.
  const handleClick = (event, to) => {
    event.preventDefault()
    navigate(to)
  }

  // On the Films slider the bar floats see-through over the video. On pages
  // that scroll, it gets a solid background so text doesn't run underneath it.
  return (
    <header ref={headerRef} className={overVideo ? 'header' : 'header header--solid'}>
      <CityClocks />
      <a className="header__name" href="/" onClick={(e) => handleClick(e, '/')}>
        {site.name}
      </a>
      <nav className="nav">
        {LINKS.map((link) => (
          <a
            key={link.to}
            href={link.to}
            className={link.isActive(path) ? 'is-active' : undefined}
            onClick={(e) => handleClick(e, link.to)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      {subtitle && <p className="header__subtitle">{subtitle}</p>}
    </header>
  )
}

export default Header
