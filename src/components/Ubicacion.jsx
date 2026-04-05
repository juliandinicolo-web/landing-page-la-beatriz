export default function Ubicacion() {
  return (
    <section id="ubicacion" className="ubicacion-section">
      <div className="section-header">
        <div className="section-tag">Cómo llegar</div>
        <h2>Ubicación</h2>
        <p>Acceso directo por <strong>Ruta Nacional 7</strong> — Uspallata, Mendoza, en plena Cordillera de los Andes.</p>
      </div>

      <div className="ubicacion-content">
        <div className="mapa-wrapper">
          <div className="ruta-video-banner">
            <span className="ruta-badge">&#x1F6E3;&#xFE0F; RUTA NACIONAL 7 KM 1141,5</span>
          </div>
          <video className="ruta-video" autoPlay muted loop playsInline preload="metadata">
            <source src={import.meta.env.BASE_URL + "video_panoramico/ruta_nacional_7.MP4"} type="video/mp4" />
          </video>
          <iframe
            id="mapa-labeatriz"
            title="Ubicación La Beatriz Casas de Montaña"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.56!2d-69.36317!3d-32.6481337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x968766958f1faa2b%3A0x44a6d48e4572de79!2sCaba%C3%B1a+La+Beatriz!5e0!3m2!1ses!2sar!4v1680000000000!5m2!1ses!2sar"
            width="100%" height="450" style={{ border: 0 }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="ubicacion-info">
          <div className="ubi-item">
            <div className="ubi-icon">📍</div>
            <div>
              <strong>Dirección exacta</strong>
              <p>Ruta Nacional 7 km 1141,5 — Uspallata, Mendoza</p>
            </div>
          </div>
          <div className="ubi-item">
            <div className="ubi-icon">🛣️</div>
            <div>
              <strong>Acceso</strong>
              <p>Ruta Nacional 7, Cordillera de Mendoza</p>
            </div>
          </div>
          <div className="ubi-item">
            <div className="ubi-icon">✈️</div>
            <div>
              <strong>Desde el Aeropuerto de Mendoza</strong>
              <p>Aprox. 90 minutos por Ruta 7</p>
            </div>
          </div>
          <div className="ubi-item">
            <div className="ubi-icon">🏙️</div>
            <div>
              <strong>Desde Ciudad de Mendoza</strong>
              <p>Aprox. 100 km hacia la cordillera</p>
            </div>
          </div>
          <div className="ubi-item">
            <div className="ubi-icon">⛷️</div>
            <div>
              <strong>Centros de Esquí</strong>
              <p>Penitentes, Puquios y El Portillo a pocos km</p>
            </div>
          </div>
          <a href="https://www.google.com/maps/place/Caba%C3%B1a+La+Beatriz/@-32.6481337,-69.3734697,15z"
             target="_blank" rel="noopener noreferrer" className="btn-primary maps-btn" id="btn-maps">
            📍 Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
