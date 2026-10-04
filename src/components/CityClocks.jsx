import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { site } from '../content.js'

// How fast the clocks scroll sideways, in pixels per second (lower = slower).
const SPEED = 15

// The city clocks scrolling slowly along the bottom of the FILMS page, like a
// ticker (cities are set in content.js). Each shows e.g. "PARIS 17:42:08".
function CityClocks() {
  // The current second. Checked 4 times a second, but the row only redraws
  // when the second actually changes.
  const [second, setSecond] = useState(() => Math.floor(Date.now() / 1000))

  useEffect(() => {
    const timer = setInterval(() => setSecond(Math.floor(Date.now() / 1000)), 250)
    return () => clearInterval(timer)
  }, [])

  // The ticker: the list of cities is repeated enough times to fill the
  // screen, and the whole row slides left by exactly one list's width, then
  // starts over. Because the next copy is then in exactly the same place,
  // the jump can't be seen, so it looks endless.
  // The sliding is a CSS animation (index.css), so updating the time every
  // second never restarts it. Each time sits in a fixed-width box, so the
  // row's width never changes either; it's only measured again when the
  // window is resized or the font finishes loading.
  const rowRef = useRef(null)
  const groupRef = useRef(null)
  const [size, setSize] = useState({ group: 0, copies: 2 })

  useLayoutEffect(() => {
    const row = rowRef.current
    const group = groupRef.current
    if (!row || !group) return
    const measure = () => {
      // exact (fractional) width, so the loop is seamless
      const width = group.getBoundingClientRect().width
      if (width <= 0) return
      const copies = Math.ceil(row.offsetWidth / width) + 1
      // ignore tiny rounding differences, so the animation is never disturbed
      setSize((old) =>
        Math.abs(old.group - width) < 0.5 && old.copies === copies ? old : { group: width, copies },
      )
    }
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    observer.observe(group)
    return () => observer.disconnect()
  }, [])

  if (site.cities.length === 0) return null

  // en-GB with hourCycle h23 = 24-hour time, 00–23. The browser knows each
  // time zone's rules, so summer time (daylight saving) is always right.
  const now = new Date(second * 1000)
  const time = (zone) =>
    now.toLocaleTimeString('en-GB', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })

  const list = (copy) => (
    <ul
      key={copy}
      ref={copy === 0 ? groupRef : undefined}
      className="clocks__group"
      aria-hidden={copy > 0 ? true : undefined} // screen readers read the list only once
    >
      {site.cities.map((city) => (
        <li key={city.zone + city.name} className="clocks__city">
          <span>{city.name}</span>
          <span className="clocks__time">{time(city.zone)}</span>
        </li>
      ))}
    </ul>
  )

  const style = {
    '--ticker-shift': `${size.group}px`,
    '--ticker-duration': `${size.group / SPEED}s`,
  }

  return (
    <div className="clocks" ref={rowRef}>
      <div className={size.group ? 'clocks__track is-moving' : 'clocks__track'} style={style}>
        {Array.from({ length: size.copies }, (_, copy) => list(copy))}
      </div>
    </div>
  )
}

export default CityClocks
