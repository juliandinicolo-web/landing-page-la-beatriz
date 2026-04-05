export default function Propiedad() {
  return (
    <section id="propiedad" className="propiedad-section">
      <div className="propiedad-bg" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}fotos_generales/20260329_115625.jpg')` }} />
      <div className="propiedad-overlay" />
      <div className="propiedad-content">
        <div className="section-tag light">La Propiedad</div>
        <h2 className="light">Un rincón exclusivo en los Andes</h2>
        <div className="propiedad-grid">
          <div className="propiedad-stat"><div className="stat-num">3</div><div className="stat-label">Casas de montaña de diseño</div></div>
          <div className="propiedad-stat"><div className="stat-num">2 ha</div><div className="stat-label">Hectáreas privadas de terreno</div></div>
          <div className="propiedad-stat"><div className="stat-num">5</div><div className="stat-label">Personas de capacidad por casa</div></div>
          <div className="propiedad-stat"><div className="stat-num">RN7</div><div className="stat-label">Acceso por Ruta Nacional 7</div></div>
        </div>
        <p className="propiedad-text">
          Enclavada en la Cordillera de los Andes, en el corazón de Uspallata, Mendoza, La Beatriz es un complejo de casas de montaña con acceso directo desde la Ruta Nacional 7, la legendaria ruta que une Argentina con Chile. 2 hectáreas de terreno privado rodeadas de montañas, vegetación autóctona y vistas panorámicas que quitan el aliento.
        </p>
      </div>
    </section>
  )
}
