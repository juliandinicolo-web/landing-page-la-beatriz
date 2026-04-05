const CHECK = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>

const FEATURES = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, text: 'Arquitectura moderna en hormigón visto' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, text: 'Capacidad 5 personas por casa' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6l5 5 5-5M1 12l5 5 5-5"/><path d="M17 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3"/></svg>, text: 'WiFi Starlink de alta velocidad' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Acceso directo por Ruta Nacional 7' },
]

export default function FeaturesStrip() {
  return (
    <section className="features-strip">
      {FEATURES.map((f, i) => (
        <div key={i} className="feature-item">{f.icon}<span>{f.text}</span></div>
      ))}
    </section>
  )
}

export { CHECK }
