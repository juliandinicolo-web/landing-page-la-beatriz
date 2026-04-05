export default function Invierno() {
  const CENTROS = [
    {
      url: 'https://www.google.com/maps/place/Los+Penitentes/@-32.8407,-69.8827,15z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Los_Penitentes_Ski_Resort.jpg/640px-Los_Penitentes_Ski_Resort.jpg',
      alt: 'Centro de Ski Los Penitentes, Mendoza',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Los_Penitentes_ski.jpg/640px-Los_Penitentes_ski.jpg',
      icon: '⛷️', title: 'Los Penitentes',
      desc: 'Centro de esquí de Mendoza, famoso por sus paisajes andinos nevados y proximidad a Uspallata. Ideal para disfrutar el clima blanco.'
    },
    {
      url: 'https://www.google.com/maps/place/Los+Puquios/@-32.86,-69.72,13z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Uspallata_invierno.jpg/640px-Uspallata_invierno.jpg',
      alt: 'Los Puquios parque de nieve Uspallata',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Cordillera_nieve_mendoza.jpg/640px-Cordillera_nieve_mendoza.jpg',
      icon: '🏔️', title: 'Los Puquios',
      desc: 'Parque de nieve familiar en las cercanías de Uspallata. Picnics, trineos y diversión en la cordillera, perfecto para quienes inician.'
    },
    {
      url: 'https://www.google.com/maps/place/Portillo/@-32.8361,-70.1271,15z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hotel_Portillo.jpg/640px-Hotel_Portillo.jpg',
      alt: 'El Portillo, hotel amarillo y Laguna del Inca',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Portillo_MG_1449.JPG/640px-Portillo_MG_1449.JPG',
      icon: '🎿', title: 'El Portillo',
      desc: 'Legendario resort chileno a pasos del cruce fronterizo. Descenso de alta montaña, Laguna del Inca y vistas internacionales.'
    }
  ]

  const ACTS = [
    { icon: '⛷️', title: 'Esquí & Snowboard', desc: 'Pistas de todos los niveles en los centros más completos de Cuyo' },
    { icon: '❄️', title: 'Trekking en Nieve', desc: 'Caminatas guiadas por senderos nevados y vistas panorámicas únicas' },
    { icon: '🔥', title: 'Noches de Fogón',   desc: 'Reuniones alrededor del fuego con vista a las montañas nevadas' },
    { icon: '📸', title: 'Fotografía de Paisajes', desc: 'La cordillera cubierta de nieve ofrece escenas de una belleza incomparable' },
  ]

  const GALS = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hotel_Portillo.jpg/800px-Hotel_Portillo.jpg', alt: 'Hotel Portillo' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Los_Penitentes_Ski_Resort.jpg/800px-Los_Penitentes_Ski_Resort.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ski_Andes_invierno.jpg/800px-Ski_Andes_invierno.jpg', alt: 'Los Penitentes' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Uspallata_invierno.jpg/800px-Uspallata_invierno.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cordillera_de_los_Andes_invierno.jpg/800px-Cordillera_de_los_Andes_invierno.jpg', alt: 'Cordillera Nevada' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Aconcagua_from_south_with_normal_route.jpg/800px-Aconcagua_from_south_with_normal_route.jpg', alt: 'Aconcagua desde el sur' }
  ]

  return (
    <section id="invierno" className="temporada-section invierno-section">
      <div className="temporada-header">
        <div className="season-icon">❄️</div>
        <div className="section-tag">Junio a Septiembre</div>
        <h2>Invierno en la Cordillera</h2>
        <p>La nieve transforma los Andes en un paraíso blanco. Los mejores centros de esquí de Sudamérica están a pocos minutos de La Beatriz.</p>
      </div>

      <div className="centros-ski">
        <h3 className="centros-title">Centros de Esquí Cercanos</h3>
        <div className="centros-grid">
          {CENTROS.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="centro-card">
              <div className="centro-photo">
                <img src={c.img} alt={c.alt} loading="lazy" onError={(e) => { e.currentTarget.src = c.fallback; e.currentTarget.onerror = null; }} />
              </div>
              <div className="centro-body">
                <div className="centro-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
                <span className="maps-link">📍 Ver en Google Maps</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="temporada-actividades">
        <h3>Qué hacer en invierno</h3>
        <div className="act-grid">
          {ACTS.map((a, i) => (
            <div key={i} className="act-card">
              <div className="act-emoji">{a.icon}</div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="season-gallery">
        {GALS.map((g, i) => (
          <img key={i} src={g.src} alt={g.alt} className="season-img" loading="lazy" onError={g.fallback ? (e) => { e.currentTarget.src = g.fallback; e.currentTarget.onerror = null; } : undefined} />
        ))}
      </div>
    </section>
  )
}
