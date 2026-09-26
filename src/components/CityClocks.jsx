import { useEffect, useState } from 'react'
import { site } from '../content.js'

// The row of city clocks along the top edge (cities are set in content.js).
// Shows hours:minutes, 24h, and updates when the minute changes.
function CityClocks() {
  // The current minute. Checked every second, but the row only redraws
  // when the minute actually changes.
  const [minute, setMinute] = useState(() => Math.floor(Date.now() / 60000))

  useEffect(() => {
    const timer = setInterval(() => setMinute(Math.floor(Date.now() / 60000)), 1000)
    return () => clearInterval(timer)
  }, [])

  if (site.cities.length === 0) return null

  const now = new Date(minute * 60000)
  const time = (zone) =>
    now.toLocaleTimeString('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <ul className="clocks">
      {site.cities.map((city) => (
        <li key={city.zone + city.name} className="clocks__city">
          <span className="clocks__name">{city.name}</span>
          <span className="clocks__short">{city.short || city.name}</span>
          <span className="clocks__time">{time(city.zone)}</span>
        </li>
      ))}
    </ul>
  )
}

export default CityClocks
