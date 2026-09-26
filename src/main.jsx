import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Focus outline, for the WHOLE site (every link and button, also future ones):
// after a mouse click, the clicked link/button is un-selected. Otherwise the
// browser keeps it selected, and a later key press (e.g. the arrow keys on the
// Films slider or in the full-screen viewer) makes it draw the keyboard outline
// around it. Keyboard users are not affected: Enter/Space give event.detail 0,
// so their outline stays (see :focus-visible in index.css).
document.addEventListener('click', (event) => {
  if (event.detail === 0) return
  const clicked = event.target.closest?.('a, button, [tabindex]')
  if (clicked && clicked === document.activeElement) clicked.blur()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
