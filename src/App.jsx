import { useState, useEffect, useCallback } from 'react'

function App() {
  const [view, setView] = useState('film')
  const [selectedProject, setSelectedProject] = useState(null)
  const [fullscreenIndex, setFullscreenIndex] = useState(null)

  const filmProjects = [
    { 
      id: 1, title: "READY TO DIE", category: "MUSIC VIDEO", thumbnail: "/STILLS/rtd_01.jpeg", vimeoId: "1123435215", aspect: "3/2",
      stills: ["/STILLS/rtd_01.jpeg", "/STILLS/rtd_02.jpeg", "/STILLS/rtd_03.jpeg", "/STILLS/rtd_04.jpeg", "/STILLS/rtd_05.jpeg", "/STILLS/rtd_06.jpeg"],
      topCredits: [{ label: "Directed & Edited by", name: "Aleksi Ojala" }, { label: "Produced by", name: "Illuzion" }, { label: "Cinematography", name: "Tuomas Nurmi" }],
      otherCredits: [
        { label: "Song by", name: "Salomon Faye, Antoine Poyeton, Pierre Juarez" }, { label: "Starring", name: "Salomon Faye & Marie-Rose Messina" },
        { label: "Producer", name: "Raphaël Ribichesu" }, { label: "1st AC", name: "Paul Bellon" }, { label: "Costume Designer", name: "Maxime Von Muralt" },
        { label: "Set Designer", name: "Elle Mikkola" }, { label: "Additional Edit", name: "Islam Faris & Rasmus Purola" }, { label: "Sound Designer", name: "Akseli Soini" },
        { label: "Colorist", name: "Elias Lauronen" }, { label: "Title Designer", name: "Aleksi Tammi" }, { label: "Title Animation by", name: "Otso Reitala" }, { label: "Production Assistant", name: "Julien Fernandes" }
      ]
    },
    { 
      id: 2, title: "GARBADURA", category: "COMMERCIAL", thumbnail: "/STILLS/image1.jpg", vimeoId: "879885415", aspect: "3/2",
      stills: ["/STILLS/image1.jpg", "/STILLS/image2.jpg", "/STILLS/image3.jpg", "/STILLS/image4.jpg", "/STILLS/image6.jpg"],
      topCredits: [{ label: "Directed & Produced by", name: "Aleksi Ojala" }, { label: "Executive Producer", name: "Werneri Vanhanen" }, { label: "Cinematography", name: "Tuomas Nurmi" }],
      otherCredits: [
        { label: "B-Camera", name: "Henri Tevajärvi, Aleksi Ojala" }, { label: "Edited by", name: "Islam Faris" }, { label: "Music by", name: "Otto Taimela" },
        { label: "Sound Designer", name: "Will North" }, { label: "Add. Sound Design", name: "Otto Taimela" }, { label: "Colorist", name: "Elias Lauronen" },
        { label: "Graphic Designer", name: "Henri Tevajärvi" }, { label: "Talents", name: "Säde Tiger & Antti Nguyen" }
      ]
    },
    { 
      id: 3, title: "GEM VINTAGE", category: "COMMERCIAL", thumbnail: "/STILLS/image3.jpg", vimeoId: "879470610", aspect: "16/9", stills: [], 
      topCredits: [{ label: "Director & Editor", name: "Aleksi Ojala" }, { label: "Executive Producer", name: "Werneri Vanhanen" }, { label: "DOP", name: "Tuomas Nurmi" }],
      otherCredits: [{ label: "Producer", name: "Kirmo Manninen" }, { label: "Music", name: "Otto Taimela" }, { label: "Graphic Designer", name: "Henri Tevajärvi" }, { label: "Stylist", name: "Werneri Vanhanen" }]
    }
  ]

  const aiProjects = [
    { id: 101, title: "AI SERVER 01", category: "AI GENERATED", thumbnail: "/STILLS/image4.jpg" },
    { id: 102, title: "SYNTHETIC LANDSCAPES", category: "AI GENERATED", thumbnail: "/STILLS/image2.jpg" },
    { id: 103, title: "AMBIENT VOIDS", category: "AI GENERATED", thumbnail: "/STILLS/image6.jpg" }
  ]

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedProject && fullscreenIndex !== null) setFullscreenIndex((prev) => (prev + 1) % selectedProject.stills.length);
  }, [selectedProject, fullscreenIndex]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedProject && fullscreenIndex !== null) setFullscreenIndex((prev) => (prev - 1 + selectedProject.stills.length) % selectedProject.stills.length);
  }, [selectedProject, fullscreenIndex]);

  const handleKeyDown = useCallback((event) => {
    if (fullscreenIndex === null) return;
    if (event.key === 'Escape') setFullscreenIndex(null);
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
  }, [fullscreenIndex, nextImage, prevImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (!hash || hash === 'film') { setView('film'); setSelectedProject(null) }
      else if (hash === 'about') { setView('about'); setSelectedProject(null) }
      else if (hash.startsWith('project-')) {
        const id = parseInt(hash.split('-')[1]);
        const project = filmProjects.find(p => p.id === id);
        if (project) { setView('film'); setSelectedProject(project) }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [filmProjects])

  const navigateTo = (newView, project = null) => {
    window.location.hash = project ? `project-${project.id}` : newView
  }

  const edge = '60px'

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#fff', color: '#000', fontFamily: '-apple-system, sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <header style={{ position: 'fixed', zIndex: 100, top: 0, padding: edge, width: '100%', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box', pointerEvents: 'none', alignItems: 'flex-start' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 onClick={() => navigateTo('film')} style={{ fontSize: '14px', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>Aleksi Ojala</h1>
            {!selectedProject && view !== 'about' && (
              <>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.4, margin: 0, fontWeight: '400', letterSpacing: '0.05em', lineHeight: 1.2 }}>Film & Art Director</p>
                <a href="mailto:aleksijuhaniojala@gmail.com" style={{ color: '#000', fontSize: '12px', textDecoration: 'none', display: 'block', lineHeight: 1.2 }}>aleksijuhaniojala@gmail.com</a>
              </>
            )}
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '30px', pointerEvents: 'auto', alignItems: 'flex-start' }}>
          {selectedProject && (
            <button onClick={() => navigateTo('film')} style={{ background: 'none', border: 'none', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: '800', borderBottom: '1.5px solid #000', padding: 0 }}>
              Back to Index
            </button>
          )}
          <button onClick={() => navigateTo('film')} style={{ background: 'none', border: 'none', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: view === 'film' && !selectedProject ? '800' : '400', borderBottom: view === 'film' && !selectedProject ? '1.5px solid #000' : 'none', padding: 0 }}>Work</button>
          <button onClick={() => navigateTo('about')} style={{ background: 'none', border: 'none', fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer', fontWeight: view === 'about' ? '800' : '400', borderBottom: view === 'about' ? '1.5px solid #000' : 'none', padding: 0 }}>About</button>
        </nav>
      </header>

      <main style={{ width: '100%', height: '100vh', position: 'relative' }}>
        {view === 'about' ? (
          /* ABOUT SECTION */
          <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20%', paddingBottom: '8vh' }}>
            <div style={{ maxWidth: '600px', textAlign: 'center', lineHeight: 1.8, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>
              <div style={{ marginBottom: '20px' }}>
                Finland-born film & art director based in Paris, France.
              </div>
              <div style={{ marginBottom: '30px' }}>
                Working as an art director, visual researcher & AI artist on global TVC, music video & narrative projects.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <a href="mailto:aleksijuhaniojala@gmail.com" style={{ color: '#000', fontSize: '12px', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: '2px', display: 'inline-block' }}>
                  aleksijuhaniojala@gmail.com
                </a>
                <a href="tel:+358505023185" style={{ color: '#000', fontSize: '12px', textDecoration: 'none', display: 'inline-block' }}>
                  +358 50 502 3185
                </a>
              </div>
            </div>
          </div>
        ) : !selectedProject ? (
          <div id="scroll-container" style={{ width: '100%', height: '100vh', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
            {filmProjects.map(project => (
              <section key={project.id} style={{ height: '100vh', width: '100%', position: 'relative', scrollSnapAlign: 'start', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80%', maxWidth: '900px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '11px', textTransform: 'uppercase' }}>
                    <span style={{ fontWeight: '700' }}>{project.title}</span>
                    <span style={{ opacity: 0.3, fontStyle: 'italic' }}>{project.category}</span>
                  </div>
                  <div onClick={() => navigateTo('film', project)} style={{ width: '100%', aspectRatio: '16/9', cursor: 'pointer', overflow: 'hidden' }}>
                    <img src={project.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* PROJECT PAGE */
          <div style={{ position: 'absolute', top: '54%', left: '50%', transform: 'translate(-50%, -50%)', width: '85%', maxWidth: '1400px' }}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'stretch' }}>
              <div style={{ width: selectedProject.stills.length > 0 ? '62%' : '75%', aspectRatio: selectedProject.aspect || '3/2', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
                <iframe src={`https://player.vimeo.com/video/${selectedProject.vimeoId}?title=0&byline=0&portrait=0&badge=0`} style={{ position: 'absolute', top: selectedProject.aspect === "16/9" ? 0 : '-11%', left: 0, width: '100%', height: selectedProject.aspect === "16/9" ? '100%' : '122%', border: 'none' }} allowFullScreen></iframe>
              </div>
              {selectedProject.stills.length > 0 && (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: '10px' }}>
                  {selectedProject.stills.map((still, i) => (
                    <div key={i} onClick={() => setFullscreenIndex(i)} style={{ width: '100%', height: '100%', backgroundColor: '#f8f8f8', overflow: 'hidden', cursor: 'zoom-in' }}>
                      <img src={still} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ width: selectedProject.stills.length > 0 ? '100%' : '75%', margin: '30px auto 0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px 30px', width: '100%' }}>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', display: 'flex', gap: '10px', paddingBottom: '15px' }}>
                   <span style={{ fontWeight: '800' }}>{selectedProject.title}</span>
                   <span style={{ opacity: 0.3, fontStyle: 'italic' }}>{selectedProject.category}</span>
                </div>
                {selectedProject.topCredits?.map((c, i) => (
                  <div key={i} style={{ fontSize: '9px', textTransform: 'uppercase', display: 'flex', gap: '8px', paddingBottom: '15px' }}>
                    <span style={{ opacity: 0.3, whiteSpace: 'nowrap' }}>{c.label}</span>
                    <span style={{ fontWeight: '600', whiteSpace: 'nowrap' }}>{c.name}</span>
                  </div>
                ))}
                {selectedProject.otherCredits?.map((c, i) => (
                  <div key={i} style={{ fontSize: '9px', textTransform: 'uppercase', display: 'flex', gap: '8px' }}>
                    <span style={{ opacity: 0.3, whiteSpace: 'nowrap' }}>{c.label}</span>
                    <span style={{ fontWeight: '600', whiteSpace: 'nowrap' }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {fullscreenIndex !== null && selectedProject && (
          <div onClick={() => setFullscreenIndex(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.98)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={prevImage} style={{ position: 'absolute', left: '40px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', padding: '20px', zIndex: 1001, opacity: 0.3 }}>←</button>
            <img src={selectedProject.stills[fullscreenIndex]} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', cursor: 'default' }} onClick={(e) => e.stopPropagation()} alt="" />
            <button onClick={nextImage} style={{ position: 'absolute', right: '40px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', padding: '20px', zIndex: 1001, opacity: 0.3 }}>→</button>
          </div>
        )}
      </main>

      <footer style={{ position: 'fixed', zIndex: 100, bottom: 0, padding: edge, width: '100%', display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none', alignItems: 'flex-end' }}>
        {!selectedProject && (
          <div style={{ display: 'flex', gap: '30px', fontSize: '11px', fontWeight: '700', pointerEvents: 'auto' }}>
            <a href="https://www.instagram.com/aleksi0jala/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000' }}>INSTAGRAM</a>
            <a href="https://vimeo.com/aleksiojala" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000' }}>VIMEO</a>
          </div>
        )}
      </footer>
    </div>
  )
}

export default App