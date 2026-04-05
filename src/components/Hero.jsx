import { useState, useEffect } from 'react'

const SLIDES = [
  import.meta.env.BASE_URL + 'fotos_generales/foto_caba%C3%B1as_panoramica.png',
  import.meta.env.BASE_URL + 'fotos_generales/20260329_115625.jpg',
  import.meta.env.BASE_URL + 'fotos_generales/20260329_115458.jpg',
  import.meta.env.BASE_URL + 'fotos_generales/foto_caba%C3%B1as_1_2.png',
  import.meta.env.BASE_URL + 'fotos_generales/foto_patio_trasero_1_2.png',
  import.meta.env.BASE_URL + 'cabana_2/20260329_112259.jpg',
]

export default function Hero() {
  const [current, setCurrent] = useState(-1) // -1 = solo video, luego empieza slideshow

  useEffect(() => {
    let interval
    const t = setTimeout(() => {
      setCurrent(0)
      interval = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 5500)
    }, 7000)
    return () => { clearTimeout(t); clearInterval(interval) }
  }, [])

  return (
    <section id="hero">
      <div className="hero-media">
        {/* Video panorámico — playsInline es clave para iOS */}
        <img className="hero-video-bg" src={import.meta.env.BASE_URL + "video_panoramico/video_panoramico.gif"} alt="Background Panoramico" />
        <div className="hero-slides">
          {SLIDES.map((src, i) => (
            <div key={i}
                 className={`hero-slide${i === current ? ' active' : ''}`}
                 style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-tag" style={{ color:'#FFD700', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>
          CORDILLERA DE LOS ANDES · MENDOZA · USPALLATA
        </div>
        <h1 className="hero-title">La Beatriz<br/><span>Casas de Montaña</span></h1>
        <p className="hero-slogan" style={{ color:'rgba(255,255,255,0.9)', fontStyle:'normal', letterSpacing:'0.05em' }}>
          Donde el lujo se encuentra con la grandeza de los Andes
        </p>
        <div className="hero-badges">
          <div className="hero-badge"><span className="badge-num">3</span><span className="badge-label">Casas</span></div>
          <div className="hero-divider" />
          <div className="hero-badge"><span className="badge-num">5</span><span className="badge-label">Personas c/u</span></div>
          <div className="hero-divider" />
          <div className="hero-badge"><span className="badge-num">2 ha</span><span className="badge-label">de terreno</span></div>
        </div>
        <a href="#contacto" className="btn-primary">Consultar disponibilidad</a>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Descubrí más</span>
      </div>
    </section>
  )
}
