import { Fragment, useLayoutEffect, useRef } from 'react'
import { site } from '../content.js'
import useMediaQuery from '../hooks/useMediaQuery.js'

// ABOUT: a big, bold bio statement in the middle, the email address under
// it (clickable), and small INSTAGRAM and LINKEDIN links below, stacked.
function About() {
  const links = [
    { label: 'INSTAGRAM', href: site.instagram },
    { label: 'LINKEDIN', href: site.linkedin },
  ]

  const isPhone = useMediaQuery('(max-width: 700px)')
  const linksRef = useRef(null)

  // Phones: the links are centred, so their first letter often starts between
  // two screen pixels. The Thin letters are only a hairline thick, so the
  // upright stroke (e.g. of the L in LINKEDIN) gets smeared over two pixels
  // and looks broken. This nudges each link (by less than half a pixel) so its
  // text starts exactly on a screen pixel. Re-checked when the window or the
  // text size changes (e.g. when the font has loaded). Desktop: no nudge.
  useLayoutEffect(() => {
    const list = linksRef.current
    const items = [...list.querySelectorAll('a, span')]

    const snap = () => {
      const pixel = 1 / window.devicePixelRatio // one screen pixel, in CSS pixels
      for (const item of items) {
        item.style.left = ''
        if (!isPhone) continue
        const text = document.createRange()
        text.selectNodeContents(item.firstChild) // the letters only, not the hidden Regular copy
        const x = text.getBoundingClientRect().left
        item.style.left = `${Math.round(x / pixel) * pixel - x}px`
      }
    }

    snap()
    document.fonts?.ready.then(snap)
    const observer = new ResizeObserver(snap)
    observer.observe(list)
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [isPhone])

  return (
    <main className="page page--center">
      <div className="bio">
        {site.bio.map((paragraph) => (
          <p key={paragraph}>
            {/* \n in content.js = a line break on desktop only; on phones
                (.bio__break is hidden) the text wraps naturally */}
            {paragraph.split('\n').map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br className="bio__break" />}
                {i > 0 && ' '}
                {line}
              </Fragment>
            ))}
          </p>
        ))}
      </div>

      {site.email && (
        <a className="about-email" href={`mailto:${site.email}`} data-text={site.email}>
          {site.email}
        </a>
      )}

      <ul className="about-links" ref={linksRef}>
        {links.map((link) => (
          <li key={link.label}>
            {/* A link without an address yet is shown dimmed and isn't clickable. */}
            {link.href ? (
              <a href={link.href} target="_blank" rel="noreferrer" data-text={link.label}>
                {link.label}
              </a>
            ) : (
              <span className="dim">{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default About
