import { useEffect, useState } from 'react'

// true/false depending on the screen, e.g. useMediaQuery('(max-width: 700px)')
// is true on phones. Updates when the window is resized.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export default useMediaQuery
