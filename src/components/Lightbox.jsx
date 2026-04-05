import { useEffect } from 'react'

export default function Lightbox({ src, open, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`lightbox${open ? ' open' : ''}`} id="lightbox" onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      <img src={src} className="lightbox-img" id="lightbox-img" alt="Vista ampliada" onClick={(e) => e.stopPropagation()} />
    </div>
  )
}
