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
    { city: 'LA', tz: 'America/Los_Angeles' },
    { city: 'NY', tz: 'America/New_York' },
    { city: 'LDN', tz: 'Europe/London' },
    { city: 'PAR', tz: 'Europe/Paris' },
    { city: 'HEL', tz: 'Europe/Helsinki' },
    { city: 'TKO', tz: 'Asia/Tokyo' }
  ];
  const singlePass = zones.map(z => `${z.city} ${formatTime(z.tz)}`).join(' // ');
  
  return (
    <div style={{ 
      width: '100%', 
      overflow: 'hidden', 
      whiteSpace: 'nowrap', 
      borderBottom: '1px solid #000', 
      padding: '4px 0', 
      background: '#fff', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    }}>
      <style>{`
          @keyframes infiniteLoop {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .ticker-content {
            display: inline-block;
            animation: infiniteLoop 30s linear infinite;
            font-size: 8px;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            letter-spacing: 0.1em;
          }
        `}</style>
      <div className="ticker-content"><span>{singlePass} // {singlePass} // </span></div>
      <div className="ticker-content"><span>{singlePass} // {singlePass} // </span></div>
    </div>
  );
};

function App() {
  const projects = [
    { 
      id: 1, 
      title: 'READY TO DIE', 
      year: '2026',
      credits: 'JANNI VEPSÄLÄINEN',
      desc: 'NARRATIVE-DRIVEN VISUAL EXPLORATION. SHOT IN PARIS.',
      vimeoId: '1123435215', 
      stills: ['/STILLS/rtd_01.jpeg', '/STILLS/rtd_02.jpeg', '/STILLS/rtd_03.jpeg', '/STILLS/rtd_04.jpeg'], 
      aspectRatio: '3/2' 
    },
    { 
      id: 2, 
      title: 'GARBADURA', 
      year: '2025',
      credits: 'ALEKSI OJALA',
      desc: 'EXPERIMENTAL COMMERCIAL WORK FOR SS25 COLLECTION.',
      vimeoId: '879885415', 
      stills: ['/STILLS/garb_01.jpeg', '/STILLS/garb_02.jpeg', '/STILLS/garb_03.jpeg', '/STILLS/garb_04.jpeg'], 
      aspectRatio: '3/2'
    },
    { 
      id: 3, 
      title: 'GEM VINTAGE', 
      year: '2024',
      credits: 'ALEKSI OJALA',
      desc: 'MACRO-LEVEL STUDY OF TEXTURES AND RARE MATERIALS.',
      vimeoId: '879470610', 
      stills: ['/STILLS/gem_01.jpeg', '/STILLS/gem_02.jpeg', '/STILLS/gem_03.jpeg', '/STILLS/gem_04.jpeg'], 
      aspectRatio: '16/9'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#fff', color: '#000', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      
      <TimeTicker />

      {/* TOP HEADER SECTION */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '20px', 
        alignItems: 'flex-start',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '900', margin: 0, lineHeight: 0.9 }}>ALEKSI<br/>OJALA</h1>
          </div>
          <div style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', lineHeight: '1.4' }}>
            Art Director & AI Artist.<br/>Paris, France.<br/>
            <a href="mailto:aleksijuhaniojala@gmail.com" style={{ color: '#000', textDecoration: 'none', borderBottom: '1px solid #000' }}>aleksijuhaniojala@gmail.com</a>
          </div>
        </div>
        <div style={{ fontSize: '9px', fontWeight: '700' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#000', border: '1px solid #000', padding: '4px 12px' }}>[ PLAY_SOUND ]</a>
        </div>
      </div>

      {/* MAIN FEED */}
      <div style={{ padding: '40px 20px' }}>
        {projects.map((p) => (
          <section key={p.id} style={{ marginBottom: '120px' }}>
            
            {/* PROJECT INFO HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase' }}>
                <div style={{ marginBottom: '5px' }}>{p.title}</div>
                <div style={{ opacity: 0.6, maxWidth: '300px' }}>{p.desc}</div>
                <a href="#" style={{ color: 'red', textDecoration: 'none', display: 'block', marginTop: '5px' }}>SEE MORE</a>
              </div>
              
              <div style={{ textAlign: 'right', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase' }}>
                <div style={{ fontWeight: '900', borderBottom: '1px solid #000', display: 'inline-block', marginBottom: '5px' }}>{p.year}</div>
                <div style={{ opacity: 0.4 }}>CLIENT CD: {p.credits}</div>
              </div>
            </div>

            {/* CONTENT GRID: VIDEO LEFT, STILLS RIGHT - VIDEO SIZE ADJUSTED */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
              
              {/* VIDEO */}
              <div style={{ width: '100%', aspectRatio: p.aspectRatio, backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
                <iframe 
                  src={`https://player.vimeo.com/video/${p.vimeoId}?title=0&byline=0&portrait=0`} 
                  style={{ width: '100%', height: '100%', border: 'none' }} 
                  allowFullScreen 
                />
              </div>

              {/* STILLS GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '15px' }}>
                {p.stills.map((s, i) => (
                  <div key={i} style={{ width: '100%', aspectRatio: '3/2', overflow: 'hidden' }}>
                    <img 
                      src={s} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      alt="" 
                    />
                  </div>
                ))}
              </div>

            </div>
          </section>
        ))}
      </div>

      <footer style={{ padding: '40px 20px', textAlign: 'center', fontSize: '8px', opacity: 0.2, fontWeight: '700' }}>
        ALEKSI OJALA // MULTIDISCIPLINARY ART DIRECTION // 2026
      </footer>
    </div>
  );
}

export default App;