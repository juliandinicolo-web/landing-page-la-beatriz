import { useState } from 'react'
import { CHECK } from './FeaturesStrip'

const CABANAS = [
  {
    id: 1,
    title: 'Casa de Montaña 1',
    desc: 'Construida en hormigón visto con acabados de diseño, esta casa combina la solidez de la piedra con la calidez de sus interiores. Techos de vigas de madera expuestas, pisos de cemento alisado y decoración cuidada crean un ambiente único e irrepetible.',
    amenities: ['Hasta 5 personas', '2 baños completos', 'WiFi Starlink', 'Smart TV en living y dormitorio', 'Parrilla & fogón privado', 'Cocina totalmente equipada', 'Living-comedor integrado', 'Hormigón visto + vigas de madera'],
    video: import.meta.env.BASE_URL + 'video_cabana_1_2/video_cabanas_1_2.gif',
    fotos: [
      { src: import.meta.env.BASE_URL + 'fotos_generales/foto_patio_trasero_1_2.png', alt: 'Patio' },
      { src: import.meta.env.BASE_URL + 'cabana_1/comedor diario cabana_1.jpg', alt: 'Comedor' },
      { src: import.meta.env.BASE_URL + 'cabana_1/dormitorio cabana_1.jpg', alt: 'Dormitorio' },
      { src: import.meta.env.BASE_URL + 'cabana_1/living cabana_1.jpg', alt: 'Living' },
      { src: import.meta.env.BASE_URL + 'cabana_1/living sofa con vista verde cabana_1.jpg', alt: 'Sofa' },
      { src: import.meta.env.BASE_URL + 'cabana_1/bano_completo.jpg', alt: 'Baño' },
      { src: import.meta.env.BASE_URL + 'cabana_1/bano_espejo.jpg', alt: 'Baño Espejo' },
      { src: import.meta.env.BASE_URL + 'cabana_1/terraza con parrilla y fogon cabana_1.jpg', alt: 'Terraza' }
    ]
  },
  {
    id: 2,
    title: 'Casa de Montaña 2',
    reverse: true,
    desc: 'Espacios amplios bañados de luz natural a través de grandes ventanales. El diseño industrial elegante fusiona hormigón, madera y metal para crear un refugio de montaña contemporáneo y sofisticado, pensado para el máximo confort.',
    amenities: ['Hasta 5 personas', '2 baños completos', 'WiFi Starlink', 'Smart TV en living y dormitorio', 'Parrilla & fogón privado', 'Ambientes amplios con luz natural', 'Diseño industrial moderno', 'Vista a la montaña'],
    video: import.meta.env.BASE_URL + 'video_cabana_1_2/video_cabanas_1_2.gif',
    fotos: [
      { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112259.jpg', alt: 'Living' },
      { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112342.jpg', alt: 'Comedor' },
      { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112540.jpg', alt: 'Cocina' },
      { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112649.jpg', alt: 'Habitación' },
      { src: import.meta.env.BASE_URL + 'cabana_2/20260329_112740.jpg', alt: 'Detalle' },
      { src: import.meta.env.BASE_URL + 'cabana_2/IMG-20251229-WA0056.jpg', alt: 'Exterior' }
    ]
  },
  {
    id: 3,
    title: 'Casa de Montaña 3',
    desc: 'La tercera propuesta arquitectónica del complejo. Misma filosofía de diseño: solidez, confort y estética contemporánea. Perfecta para grupos familiares o de amigos que buscan privacidad y exclusividad en la montaña.',
    amenities: ['Hasta 5 personas', '2 baños completos', 'WiFi Starlink', 'Smart TV en living y dormitorio', 'Parrilla & fogón privado', 'Privacidad total garantizada', 'Acceso independiente', '2 hectáreas compartidas'],
    video: import.meta.env.BASE_URL + 'video_cabana_3/video_cabana_3.gif',
    fotos: [
      { src: import.meta.env.BASE_URL + 'cabana_3/cabana_3 frente.jpg', alt: 'Frente' },
      { src: import.meta.env.BASE_URL + 'cabana_3/ventana del living vista a verde cabana_3.jpg', alt: 'Vista Verde' },
      { src: import.meta.env.BASE_URL + 'cabana_3/living cabana_3.jpg', alt: 'Living' },
      { src: import.meta.env.BASE_URL + 'cabana_3/living sillon y tele cabana_3.jpg', alt: 'Living Sillón' },
      { src: import.meta.env.BASE_URL + 'cabana_3/comedor amplio cabana_3.jpg', alt: 'Comedor' },
      { src: import.meta.env.BASE_URL + 'cabana_3/parrilla cabana_3.jpg', alt: 'Parrilla' },
      { src: import.meta.env.BASE_URL + 'cabana_3/dormitorio cabana_3.jpg', alt: 'Dormitorio' },
      { src: import.meta.env.BASE_URL + 'cabana_3/bano_ducha_espejo_cabana_3.jpg', alt: 'Baño' },
      { src: import.meta.env.BASE_URL + 'cabana_3/parque y parrilla cabana_3.jpg', alt: 'Parque' }
    ]
  }
]

function CasaBlock({ casa }) {
  const [main, setMain] = useState(casa.fotos[0].src)

  return (
    <div className={`casa-block${casa.reverse ? ' reverse' : ''}`}>
      <div className="casa-gallery">
        <div className="casa-gallery-main" style={{ overflow: 'hidden' }}>
          <img key={main} src={main} alt={casa.title} className="gallery-main-img fade-in" />
        </div>
        <div className="casa-gallery-thumbs">
          {casa.fotos.map((f, i) => (
            <img key={i} src={f.src} alt={f.alt}
                 className={`thumb${main === f.src ? ' active' : ''}`}
                 onClick={() => setMain(f.src)} />
          ))}
        </div>
      </div>
      <div className="casa-info">
        <div className="casa-number">0{casa.id}</div>
        <h3>{casa.title}</h3>
        <p className="casa-desc">{casa.desc}</p>
        <ul className="casa-amenities">
          {casa.amenities.map((a, i) => <li key={i}>{CHECK}{a}</li>)}
        </ul>
        <a href="#contacto" className="btn-secondary">Consultar esta casa</a>
      </div>
    </div>
  )
}

export default function Casas() {
  return (
    <section id="casas">
      <div className="section-header">
        <div className="section-tag">Alojamiento</div>
        <h2>Tres Casas, Una Experiencia Única</h2>
        <p>Cada casa fue diseñada con materiales nobles — hormigón visto, vigas de madera y joinery de diseño — para ofrecer confort de primer nivel en pleno contacto con la naturaleza andina.</p>
      </div>
      <div className="casas-list">
        {/* Cabina 1 */}
        <CasaBlock casa={CABANAS[0]} />
        
        {/* Cabina 2 */}
        <CasaBlock casa={CABANAS[1]} />

        {/* Video Compartido 1 y 2 */}
        <div className="casa-video-wrap shared-video">
          <div className="casa-video-label">&#127916; Video — Casas 1 y 2</div>
          <img className="casa-video" src={CABANAS[0].video} alt="Video Casas 1 y 2" />
        </div>

        {/* Cabina 3 */}
        <CasaBlock casa={CABANAS[2]} />
        <div className="casa-video-wrap">
          <div className="casa-video-label">&#127916; Video — Casa 3</div>
          <img className="casa-video" src={CABANAS[2].video} alt="Video Casa 3" />
        </div>
      </div>
    </section>
  )
}
