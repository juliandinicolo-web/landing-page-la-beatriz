export default function Galeria({ openLightbox }) {
  const FOTOS = [
    { src: import.meta.env.BASE_URL + 'fotos_generales/20260329_115458.jpg', class: 'tall', alt: 'Terreno con árboles' },
    { src: import.meta.env.BASE_URL + 'fotos_generales/20260329_115625.jpg', class: '', alt: 'Entrada La Beatriz' },
    { src: import.meta.env.BASE_URL + 'cabana_1/living cabana_1.jpg', class: '', alt: 'Interior casa 1' },
    { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112342.jpg', class: '', alt: 'Comedor casa 2' },
    { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112649.jpg', class: '', alt: 'Exterior casa 2' },
    { src: import.meta.env.BASE_URL + 'cabana_1/patio trasero cabana_1.jpg', class: '', alt: 'Exterior casa 1' },
  ]

  return (
    <section className="galeria-section">
      <div className="section-header">
        <div className="section-tag">Galería</div>
        <h2>El entorno que te espera</h2>
      </div>
      <div className="galeria-grid">
        {FOTOS.map((f, i) => (
          <img key={i} src={f.src} alt={f.alt}
               className={`galeria-img ${f.class}`}
               onClick={() => openLightbox(f.src)} />
        ))}
      </div>
    </section>
  )
}
