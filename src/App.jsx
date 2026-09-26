import { useState, useEffect } from 'react'

const TimeTicker = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (tz) => {
    return time.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };
  
  const zones = [
    { city: 'PARIS', tz: 'Europe/Paris' },
    { city: 'HELSINKI', tz: 'Europe/Helsinki' },
    { city: 'NEW YORK', tz: 'America/New_York' },
    { city: 'LA', tz: 'America/Los_Angeles' },
    { city: 'TOKYO', tz: 'Asia/Tokyo' }
  ];

  return (
    <div style={{ 
      width: '100%', 
      borderBottom: '1px solid #000', 
      padding: '6px 20px', 
      background: '#ffffff', 
      position: 'sticky', top: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'space-between',
      fontSize: '8px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '0.1em'
    }}>
      {zones.map((z, i) => (
        <div key={i}>{z.city} {formatTime(z.tz)}</div>
      ))}
    </div>
  );
};

function App() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    { 
      id: 1, 
      title: 'READY TO DIE', 
      year: '2026',
      genre: 'MUSIC VIDEO',
      role: 'DIRECTOR, EDITOR',
      vimeoId: '1123435215', 
      stills: ['/STILLS/rtd_01.jpeg', '/STILLS/rtd_02.jpeg', '/STILLS/rtd_03.jpeg', '/STILLS/rtd_04.jpeg'], 
      aspectRatio: '3/2',
      cover: '/STILLS/rtd_01.jpeg'
    },
    { 
      id: 2, 
      title: 'GARBADURA', 
      year: '2025',
      genre: 'COMMERCIAL',
      role: 'DIRECTOR',
      vimeoId: '879885415', 
      stills: ['/STILLS/garb_01.jpeg', '/STILLS/garb_02.jpeg', '/STILLS/garb_03.jpeg', '/STILLS/garb_04.jpeg'], 
      aspectRatio: '3/2',
      cover: '/STILLS/garb_01.jpeg'
    },
    { 
      id: 3, 
      title: 'GEM VINTAGE', 
      year: '2024',
      genre: 'COMMERCIAL',
      role: 'DIRECTOR',
      vimeoId: '879470610', 
      stills: ['/STILLS/gem_01.jpeg', '/STILLS/gem_02.jpeg', '/STILLS/gem_03.jpeg', '/STILLS/gem_04.jpeg'], 
      aspectRatio: '16/9',
      cover: '/STILLS/gem_01.jpeg'
    }
  ];

  const Header = () => (
    <div style={{ background: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '25px 20px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '60px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div onClick={() => setActiveProject(null)} style={{ cursor: 'pointer', marginBottom: '12px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0, lineHeight: '0.9', letterSpacing: '0.05em', color: '#000' }}>
                ALEKSI<br/>OJALA
              </h1>
            </div>
            <div style={{ 
              fontSize: '9px', 
              fontWeight: '700', 
              fontFamily: "'Inter', sans-serif", 
              marginTop: '38px',
              marginLeft: '9px' 
            }}>
              <a href="https://www.instagram.com/aleksi0jala/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>INSTAGRAM</a>
            </div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', lineHeight: '1.4', color: '#000', fontFamily: "'Inter', sans-serif" }}>
            FILM & ART DIRECTOR<br/>PARIS / HELSINKI<br/>
            <a href="mailto:aleksijuhaniojala@gmail.com" style={{ color: '#000', textDecoration: 'none' }}>aleksijuhaniojala@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );

  const containerStyle = { 
    minHeight: '100vh', width: '100vw', backgroundColor: '#ffffff', color: '#000', 
    fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased'
  };

  if (!activeProject) {
    return (
      <div style={containerStyle}>
        <TimeTicker />
        <Header />
        <main style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '100px', width: '50%' }}>
              <div style={{ width: '100%', marginBottom: '8px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '-0.02em' }}>{p.title}</div>
                <div style={{ color: '#ff0000', fontSize: '9px', fontWeight: '900', fontFamily: "'Space Grotesk', sans-serif" }}>{p.genre}</div>
              </div>
              <div onClick={() => setActiveProject(p)} style={{ cursor: 'pointer', width: '100%', aspectRatio: p.aspectRatio, backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                <img 
                  src={p.cover} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  alt={p.title} 
                  loading="lazy"
                  onError={(e) => { 
                    // Jos .jpeg ei toimi, kokeillaan automaattisesti .jpg päätettä
                    if (e.target.src.includes('.jpeg')) {
                        e.target.src = e.target.src.replace('.jpeg', '.jpg');
                    } else {
                        e.target.src = 'https://via.placeholder.com/800x450?text=IMAGE+NOT+FOUND';
                    }
                  }}
                />
              </div>
              <div style={{ marginTop: '8px' }}>
                <span onClick={() => setActiveProject(p)} style={{ color: '#ff0000', cursor: 'pointer', fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif" }}>SEE MORE</span>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <TimeTicker />
      <Header />
      <main style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px', textTransform: 'uppercase' }}>
            <div><h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0, letterSpacing: '-0.02em' }}>{activeProject.title}</h2></div>
            <div style={{ textAlign: 'right' }}><p style={{ fontSize: '8px', fontWeight: '900', color: '#ff0000', margin: 0 }}>{activeProject.role}</p></div>
        </div>
        <div style={{ width: '60%', aspectRatio: activeProject.aspectRatio, backgroundColor: '#000', marginBottom: '20px' }}>
          <iframe 
            src={`https://player.vimeo.com/video/${activeProject.vimeoId}?title=0&byline=0&portrait=0&autoplay=1`} 
            style={{ width: '100%', height: '100%', border: 'none' }} 
            allowFullScreen 
          />
        </div>
        <div style={{ width: '60%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
          {activeProject.stills.map((s, i) => (
            <img 
              key={i} 
              src={s} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
              alt="" 
              onError={(e) => {
                if (e.target.src.includes('.jpeg')) {
                    e.target.src = e.target.src.replace('.jpeg', '.jpg');
                }
              }}
            />
          ))}
        </div>
        <footer style={{ padding: '60px 0', textAlign: 'center' }}>
          <span onClick={() => setActiveProject(null)} style={{ cursor: 'pointer', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif", borderBottom: '1px solid #000' }}>BACK TO INDEX</span>
        </footer>
      </main>
    </div>
  );
}

export default App;