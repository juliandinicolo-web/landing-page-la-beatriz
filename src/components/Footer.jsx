export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={import.meta.env.BASE_URL + "logo_la_beatriz.jpg"} alt="La Beatriz Casas de Montaña" />
        </div>
        <div className="footer-text">
          <p><strong>La Beatriz — Casas de Montaña</strong></p>
          <p>Ruta Nacional 7 km 1141,5 · Uspallata · Mendoza · Argentina</p>
          <p className="footer-slogan">Donde el lujo se encuentra con la grandeza de los Andes</p>
        </div>
        <div className="footer-links">
          <a href="#casas">Las Casas</a>
          <a href="#invierno">Invierno</a>
          <a href="#verano">Verano</a>
          <a href="#ubicacion">Ubicación</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
      <div className="footer-copy">
        <p>© 2025 La Beatriz Casas de Montaña · Uspallata, Mendoza · Argentina</p>
      </div>
    </footer>
  )
}
