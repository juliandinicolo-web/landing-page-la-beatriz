import { useState, useEffect } from 'react'

const WA_NUMBER = '541162156858'

export default function Contacto() {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [logoBase64, setLogoBase64] = useState(null)

  useEffect(() => {
    try {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width || 300
        canvas.height = img.height || 150
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        setLogoBase64(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = '/logo_la_beatriz.jpg'
    } catch (e) {
      console.warn('Logo no disponible para PDF (CORS):', e)
    }
  }, [])

  const fmtFecha = (d) => {
    if (!d) return '–'
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  const generarPDF = async (datos) => {
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const gold = [184, 147, 90], dark = [13, 13, 13], white = [255, 255, 255]

      doc.setFillColor(...dark)
      doc.rect(0, 0, 210, 45, 'F')
      if (logoBase64) {
        try { doc.addImage(logoBase64, 'JPEG', 8, 5, 55, 35) } catch(e){}
      }

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.setTextColor(...gold)
      doc.text('LA BEATRIZ', logoBase64 ? 70 : 10, 20)
      doc.setFontSize(10)
      doc.setTextColor(...white)
      doc.text('Casas de Montaña — Uspallata, Mendoza', logoBase64 ? 70 : 10, 28)
      doc.setFontSize(8)
      doc.setTextColor(...gold)
      doc.text('Ruta Nacional 7 km 1141,5  ·  Cordillera de los Andes', logoBase64 ? 70 : 10, 36)

      doc.setFillColor(...gold)
      doc.rect(0, 45, 210, 10, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(...dark)
      doc.text('PRESUPUESTO DIGITAL — SOLICITUD DE RESERVA', 105, 52, { align: 'center' })

      let y = 68
      doc.setTextColor(...dark)
      const campo = (label, valor) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(100, 80, 40)
        doc.text(label.toUpperCase(), 14, y)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(11)
        doc.setTextColor(...dark)
        doc.text(valor || '—', 14, y + 6)
        y += 16
      }
      const sep = () => {
        doc.setDrawColor(...gold)
        doc.setLineWidth(0.3)
        doc.line(14, y - 4, 196, y - 4)
      }

      campo('Cliente', datos.nombre)
      sep()
      campo('WhatsApp / Teléfono', datos.telefono)
      sep()
      campo('Propiedad solicitada', datos.casa || 'La Beatriz — Casas de Montaña')
      sep()
      campo('Cantidad de personas', datos.personas ? `${datos.personas} personas` : '—')
      sep()

      const fmtPDFDate = (d) => {
        if (!d) return '—'
        const [yy, mm, dd] = d.split('-')
        const meses = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        return `${dd} de ${meses[parseInt(mm,10)]} de ${yy}`
      }

      campo('Fecha de llegada (check-in)', fmtPDFDate(datos.checkin))
      sep()

      let noches = ''
      if (datos.checkin && datos.checkout) {
        const diff = (new Date(datos.checkout) - new Date(datos.checkin)) / 86400000
        if (diff > 0) noches = ` (${diff} noche${diff > 1 ? 's' : ''})`
      }
      campo(`Fecha de salida (check-out)${noches}`, fmtPDFDate(datos.checkout))
      sep()

      if (datos.mensaje) {
        campo('Consulta / Comentario', datos.mensaje)
        sep()
      }

      y += 4
      doc.setFillColor(248, 242, 228)
      doc.roundedRect(14, y, 182, 44, 3, 3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...gold)
      doc.text('AMENITIES INCLUIDOS EN TODAS LAS CASAS', 105, y + 8, { align: 'center' })
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...dark)
      const amenities = [
        '✓  WiFi Starlink de alta velocidad',
        '✓  Smart TV en Living y Dormitorio',
        '✓  2 Baños completos',
        '✓  Parrilla & Fogón privado',
        '✓  Cocina totalmente equipada — Arquitectura moderna en hormigón visto'
      ]
      amenities.forEach((a, i) => { doc.text(a, 20, y + 16 + i * 6) })

      doc.setFillColor(...dark)
      doc.rect(0, 275, 210, 22, 'F')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...gold)
      doc.text('📍 Ruta Nacional 7 km 1141,5 · Uspallata · Mendoza · Argentina', 105, 283, { align: 'center' })
      doc.setTextColor(180, 180, 180)
      doc.text('La Beatriz Casas de Montaña  ·  Donde el lujo se encuentra con la grandeza de los Andes', 105, 291, { align: 'center' })

      return doc
    } catch (e) {
      console.warn('Error generando PDF:', e)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.target)
    const datos = Object.fromEntries(fd.entries())

    const pdf = await generarPDF(datos)
    if (pdf) pdf.save(`Consulta_LaBeatriz_${datos.nombre.replace(/\s+/g,'_') || 'Cliente'}.pdf`)

    let noches = ''
    if (datos.checkin && datos.checkout) {
      const diff = (new Date(datos.checkout) - new Date(datos.checkin)) / 86400000
      if (diff > 0) noches = ` (${diff} noche${diff > 1 ? 's' : ''})`
    }

    const waMsg = [
      '🏔️ *PRESUPUESTO DIGITAL — LA BEATRIZ Casas de Montaña*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Cliente:* ${datos.nombre || '–'}`,
      `📱 *WhatsApp:* ${datos.telefono || '–'}`,
      '',
      `🏠 *Propiedad:* ${datos.casa || 'La Beatriz — Casas de Montaña'}`,
      `👥 *Capacidad:* ${datos.personas || '5'} personas`,
      `📅 *Check-in:* ${fmtFecha(datos.checkin)}`,
      `📅 *Check-out:* ${fmtFecha(datos.checkout)}${noches}`,
      '',
      '⭐ *AMENITIES INCLUIDOS:*',
      '• WiFi Starlink de alta velocidad',
      '• Smart TV en cada ambiente (Living y Dormitorio)',
      '• 2 Baños completos',
      '• Parrilla y Fogón privado',
      '• Cocina totalmente equipada',
      '',
      `💬 *Consulta:* ${datos.mensaje || 'Me interesa consultar disponibilidad.'}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '📍 *Ubicación:* Ruta Nacional 7 km 1141,5 · Uspallata · Mendoza',
      '📎 *Se adjunta presupuesto en PDF con detalle completo*',
      '🌐 *Web:* https://labeatriz.com.ar'
    ].join('\n')

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`

    setTimeout(() => { window.open(waUrl, '_blank') }, pdf ? 800 : 0)

    setSuccess(pdf ? '✅ PDF descargado — Redirigiendo a WhatsApp para adjuntarlo...' : '✅ Redirigiendo a WhatsApp... ¡Gracias!')

    setTimeout(() => {
      e.target.reset()
      setLoading(false)
      setSuccess('')
    }, 5000)
  }

  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-card">
        <div className="section-tag">Reservas</div>
        <h2>Reservá tu estadía</h2>
        <p>Completá el formulario y te enviamos un resumen por WhatsApp para confirmar tu reserva.</p>

        <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Tu WhatsApp</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+54 9 261 xxx xxxx" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="casa">¿Qué casa te interesa?</label>
              <select id="casa" name="casa">
                <option value="">Seleccionar...</option>
                <option value="Casa 1">Casa 1</option>
                <option value="Casa 2">Casa 2</option>
                <option value="Casa 3">Casa 3</option>
                <option value="Varias / Todo el complejo">Varias / Todo el complejo</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="personas">Cantidad de personas</label>
              <input type="number" id="personas" name="personas" min="1" max="15" placeholder="Ej: 4" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkin">Fecha de llegada</label>
              <input type="date" id="checkin" name="checkin" />
            </div>
            <div className="form-group">
              <label htmlFor="checkout">Fecha de salida</label>
              <input type="date" id="checkout" name="checkout" />
            </div>
          </div>
          <div className="form-group full">
            <label htmlFor="mensaje">Consulta o comentario</label>
            <textarea id="mensaje" name="mensaje" rows="3" placeholder="Contanos sobre tu viaje, consultas especiales, etc." />
          </div>

          <button type="submit" className="btn-primary form-submit" id="btn-submit" disabled={loading}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'20px',height:'20px',marginRight:'8px',verticalAlign:'middle'}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar consulta por WhatsApp
          </button>
          
          {success && <div id="form-success" className="form-success">{success}</div>}
        </form>

        <div className="contacto-alt">
          <p>¿Preferís escribirnos directamente?</p>
          <div className="contacto-directos">
            <a href="https://wa.me/541162156858?text=Hola%2C%20me%20interesa%20hacer%20una%20consulta%20sobre%20disponibilidad%20en%20La%20Beatriz%20Casas%20de%20Monta%C3%B1a."
               target="_blank" rel="noopener noreferrer" className="contacto-directo wa-big" id="link-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
