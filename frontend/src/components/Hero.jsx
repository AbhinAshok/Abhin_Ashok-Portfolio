import { ArrowDown, ArrowUpRight, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import Reveal from './Reveal'

export default function Hero({ profile }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event) => {
      setRotate({ x: (event.clientY / window.innerHeight - 0.5) * -8, y: (event.clientX / window.innerWidth - 0.5) * 10 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero section-pad" id="home">
      <div className="hero-noise" />
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          
          <h1>ABHIN <span className="gradient-text">ASHOK</span></h1>
          <h2>{profile.role}</h2>
          <p className="hero-lead">{profile.headline}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">View my work <ArrowUpRight size={18} /></a>
            <a href={profile.resume_url || '#'} target="_blank" rel="noreferrer" className="button button-ghost">Download CV <Download size={17} /></a>
          </div>
          <div className="social-row" aria-label="Social links">
            <a href={profile.github_url || '#'} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href={profile.linkedin_url || '#'} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={profile.instagram_url || '#'} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={120}>
          <div className="orbital-scene" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}>
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="planet planet-one" />
            <div className="planet planet-two" />
            <div className="planet planet-three" />
            <div className="portrait-halo" />
            <img
              className="hero-portrait"
              // src={profile.profile_image_url}
              // src="src/images/photo_1.png"
              alt="Portrait of Abhin Ashok"
              onError={(event) => { event.currentTarget.style.opacity = '0.08' }}
            />
            <div className="tech-float python">Py</div>
            <div className="tech-float django">dj</div>
            <div className="tech-float database">DB</div>
            <div className="tech-float code">&lt;/&gt;</div>
            <div className="hero-pedestal">
              <span>Python</span><i /> <span>Django</span><i /> <span>REST APIs</span>
            </div>
          </div>
          <a href="#about" className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={16} /></a>
        </Reveal>
      </div>
    </section>
  )
}
