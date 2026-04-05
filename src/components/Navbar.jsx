import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <img src="/logo_la_beatriz.jpg" alt="La Beatriz Casas de Montaña" id="nav-logo-img" />
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links-list">
          <li><a href="#casas"     onClick={close}>Las Casas</a></li>
          <li><a href="#propiedad" onClick={close}>La Propiedad</a></li>
          <li><a href="#invierno"  onClick={close}>Invierno</a></li>
          <li><a href="#verano"    onClick={close}>Verano</a></li>
          <li><a href="#ubicacion" onClick={close}>Cómo Llegar</a></li>
          <li><a href="#contacto"  onClick={close} className="nav-cta">Reservar</a></li>
        </ul>
        <button className={`nav-hamburger${open ? ' open' : ''}`} id="nav-hamburger"
                aria-label="Menú" onClick={() => setOpen(o => !o)}>
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}
