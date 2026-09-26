// Thin left/right arrow icon.
function Chevron({ direction }) {
  const points = direction === 'left' ? '15,4 7,12 15,20' : '9,4 17,12 9,20'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export default Chevron
