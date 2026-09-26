import { artDirection } from '../content.js'
import Masonry from '../components/Masonry.jsx'

function ArtDirection() {
  return (
    <main className="page art">
      <Masonry items={artDirection.items} />
    </main>
  )
}

export default ArtDirection
