export default function Verano() {
  const DESTINOS = [
    {
      url: 'https://www.google.com/maps/place/Parque+Provincial+Aconcagua/@-32.65,-70.0,12z',
      img: import.meta.env.BASE_URL + 'maps_photos/aconcagua_summer_google_maps_1775421007127.png',
      title: 'Parque Aconcagua',
      desc: 'El techo de América. Trekking de alta montaña y vistas al pico más alto del hemisferio occidental (6.962 m).'
    },
    {
      url: 'https://www.google.com/maps/place/Puente+del+Inca/@-32.8244,-69.9217,15z',
      img: import.meta.env.BASE_URL + 'maps_photos/puente_del_inca_summer_google_maps_sidebar_1775421066510.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Puente_del_inca_2.jpg/600px-Puente_del_inca_2.jpg',
      title: 'Puente del Inca',
      desc: 'Formación natural única declarada monumento histórico. Un puente de roca natural sobre el río Las Cuevas.'
    },
    {
      url: 'https://www.google.com/maps/place/Cristo+Redentor/@-32.8344,-70.0757,15z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cristo_Redentor_BW.jpg/600px-Cristo_Redentor_BW.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Cristo_Redentor_de_los_Andes.jpg/600px-Cristo_Redentor_de_los_Andes.jpg',
      title: 'Cristo Redentor',
      desc: 'Símbolo de la paz entre Argentina y Chile, en la cima del paso fronterizo a 3.854 m de altitud.'
    },
    {
      url: 'https://www.google.com/maps/place/Reserva+Natural+Villavicencio/@-32.54,-68.98,13z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hotel_Villavicencio_01.jpg/600px-Hotel_Villavicencio_01.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Villavicencio.jpg/600px-Villavicencio.jpg',
      title: 'Villavicencio',
      desc: 'Reserva natural y hotel histórico en la montaña. Fauna autóctona, aguas termales y paisajes de piedra únicos.'
    },
    {
      url: 'https://www.google.com/maps/place/Potrerillos/@-32.96,-69.19,13z',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Embalse_Potrerillos.jpg/600px-Embalse_Potrerillos.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lago_Potrerillos_Mendoza.jpg/600px-Lago_Potrerillos_Mendoza.jpg',
      title: 'Dique y Playas de Potrerillos',
      desc: 'El gran embalse cordillerano. Kayak, windsurf, pesca deportiva y playas de montaña de agua dulce.'
    },
    {
      url: 'https://www.google.com/maps/place/Uspallata/@-32.5927,-69.3445,14z',
      img: import.meta.env.BASE_URL + 'maps_photos/uspallata_summer_google_maps_sidebar_1775421138694.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Rio_Mendoza_rafting.jpg/600px-Rio_Mendoza_rafting.jpg',
      title: 'Rapel & Rafting — Uspallata',
      desc: 'Adrenalina pura con empresas locales de Uspallata. Descenso en bote por el río Mendoza y rappel en paredes de montaña.'
    }
  ]

  const GALS = [
    { src: import.meta.env.BASE_URL + 'maps_photos/aconcagua_summer_google_maps_1775421007127.png', alt: 'Aconcagua verano' },
    { src: import.meta.env.BASE_URL + 'maps_photos/puente_del_inca_summer_google_maps_sidebar_1775421066510.png', alt: 'Puente del Inca', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Puente_del_inca_2.jpg/800px-Puente_del_inca_2.jpg' },
    { src: import.meta.env.BASE_URL + 'maps_photos/uspallata_summer_google_maps_sidebar_1775421138694.png', alt: 'Uspallata' },
    { src: import.meta.env.BASE_URL + 'maps_photos/google_maps_photos_1775420718454.webp', alt: 'Mapa general fotos' },
  ]

  return (
    <section id="verano" className="temporada-section verano-section">
      <div className="temporada-header">
        <div className="season-icon">☀️</div>
        <div className="section-tag">Noviembre a Marzo</div>
        <h2>Verano en la Alta Montaña</h2>
        <p>Cuando la nieve se retira, los Andes revelan paisajes extraordinarios. Aventura, cultura y naturaleza te esperan a pocos kilómetros de La Beatriz.</p>
      </div>

      <div className="temporada-actividades">
        <h3>Destinos imperdibles</h3>
        <div className="destinos-grid">
          {DESTINOS.map((d, i) => (
            <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="destino-card">
              <div className="destino-img-wrap">
                <img src={d.img} alt={d.title} loading="lazy" onError={d.fallback ? (e) => { e.currentTarget.src = d.fallback; e.currentTarget.onerror = null; } : undefined} />
              </div>
              <div className="destino-info">
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
                <span className="maps-link">📍 Ver en Google Maps</span>
              </div>
            </a>
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
