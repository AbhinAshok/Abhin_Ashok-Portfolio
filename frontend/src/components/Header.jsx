import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header({ profile }) {
  const [open, setOpen] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light') {
      document.documentElement.dataset.theme = 'light'
      setLight(true)
    }
  }, [])

  const toggleTheme = () => {
    const next = !light
    setLight(next)
    document.documentElement.dataset.theme = next ? 'light' : 'dark'
    localStorage.setItem('portfolio-theme', next ? 'light' : 'dark')
  }

  const close = () => setOpen(false)

  return (
    <header className={`site-header ${open ? 'menu-open' : ''}`}>
      <div className="container nav-shell">
        <a href="#home" className="brand" onClick={close} aria-label="Abhin Ashok home">
          <span className="brand-mark">A</span>
          <span>Abhin<span className="gradient-text"> Ashok</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'].map((item) => (
            <a key={item} href={`#${item}`}>{item}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="button button-small button-outline" href={profile.resume_url || '#'} target="_blank" rel="noreferrer">
            Resume
          </a>
          <button className="icon-button menu-button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'].map((item) => (
          <a key={item} href={`#${item}`} onClick={close}>{item}</a>
        ))}
      </nav>
    </header>
  )
}
