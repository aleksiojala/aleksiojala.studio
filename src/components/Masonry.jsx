import { useEffect, useMemo, useRef, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery.js'

// Turns a shape like '4/5' (width/height) into a number, e.g. 0.8.
// Items without a shape count as square until they've loaded.
const toNumber = (ratio) => {
  const [width, height] = String(ratio).split('/').map(Number)
  return width > 0 && height > 0 ? width / height : 1
}

// Shares the items out between the columns: each item goes into whichever
// column is currently shortest, so the columns end at similar heights.
// Worked out once, so items never jump from one column to another.
function splitIntoColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => ({ height: 0, entries: [] }))
  items.forEach((item, index) => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a))
    shortest.entries.push({ item, index })
    shortest.height += 1 / toNumber(item.ratio)
  })
  return columns.map((column) => column.entries)
}

// Cuts the list into sections: a "wide" item gets a full-width row of its
// own; the normal items between wide ones are shared out into columns.
// Each item keeps its place number (index) from the list.
function splitIntoSections(items, columnCount) {
  const sections = []
  let run = []
  const endRun = () => {
    if (run.length === 0) return
    const columns = splitIntoColumns(run.map((entry) => entry.item), columnCount)
    // put back the original place numbers
    sections.push({ columns: columns.map((col) => col.map(({ index }) => run[index])) })
    run = []
  }
  items.forEach((item, index) => {
    if (item.wide) {
      endRun()
      sections.push({ wide: { item, index } })
    } else {
      run.push({ item, index })
    }
  })
  endRun()
  return sections
}

// Pinterest-style grid: 2 columns (1 on phones), nothing cropped.
// An item with wide: true spans the full width of the grid.
// Items are not clickable (no full-screen view).
// items: [{ type: 'image' | 'video', src, alt?, poster?, ratio?, wide? }]
function Masonry({ items }) {
  const isPhone = useMediaQuery('(max-width: 700px)')
  const sections = useMemo(() => splitIntoSections(items, isPhone ? 1 : 2), [items, isPhone])

  // Browsers pause silent videos while the tab is in the background. When the
  // visitor comes back to the tab, start every video in the grid again.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      document.querySelectorAll('.masonry__item video').forEach((video) => video.play().catch(() => {}))
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <div className="masonry">
      {sections.map((section, s) =>
        section.wide ? (
          <GridItem key={section.wide.index} item={section.wide.item} />
        ) : (
          <div className="masonry__row" key={s}>
            {section.columns.map((column, c) => (
              <div className="masonry__column" key={c}>
                {column.map(({ item, index }) => (
                  <GridItem key={index} item={item} />
                ))}
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  )
}

// One image or video in the grid. Its file only starts loading when the
// visitor scrolls near it (keeps bandwidth low). Videos then play silently
// on a loop, all the time — also when scrolled off screen.
function GridItem({ item }) {
  const itemRef = useRef(null)
  const [isNear, setIsNear] = useState(false)
  // The item's shape. Updated to the file's real shape once it has loaded,
  // so nothing is ever cropped.
  const [ratio, setRatio] = useState(item.ratio || '1 / 1')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true)
          observer.disconnect() // loaded once, then it just keeps playing
        }
      },
      { rootMargin: '400px' }, // "near" = within 400px of the screen
    )
    observer.observe(itemRef.current)
    return () => observer.disconnect()
  }, [])

  let content = null
  if (!item.src) {
    content = <span className="placeholder">{item.type === 'video' ? 'VIDEO' : 'IMAGE'}</span>
  } else if (isNear && item.type === 'video') {
    content = (
      <video
        src={item.src}
        poster={item.poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        onLoadedMetadata={(e) => setRatio(`${e.target.videoWidth} / ${e.target.videoHeight}`)}
        // "autoPlay" alone isn't always enough (e.g. if the video loaded while the
        // tab was in the background), so start it ourselves as soon as it's ready
        onCanPlay={(e) => e.target.play().catch(() => {})}
      />
    )
  } else if (isNear) {
    content = (
      <img
        src={item.src}
        alt={item.alt || ''}
        onLoad={(e) => setRatio(`${e.target.naturalWidth} / ${e.target.naturalHeight}`)}
      />
    )
  }

  return (
    <div ref={itemRef} className="masonry__item" style={{ aspectRatio: ratio }}>
      {content}
    </div>
  )
}

export default Masonry
