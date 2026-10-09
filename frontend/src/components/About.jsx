import { Code2, Database, Layers3, Rocket } from 'lucide-react'
import Reveal from './Reveal'
import "../styles/about.css";

export default function About({ profile }) {
  const cards = [
    ['Backend Development', 'Scalable server-side systems with Django and DRF.', Code2],
    ['API Development', 'Clean, secure REST APIs and integrations.', Layers3],
    ['Database Design', 'Reliable schemas and query-aware data workflows.', Database],
    ['Problem Solving', 'Turning complex requirements into maintainable products.', Rocket],
  ]

  return (
    <section className="about-section" id="about">

      <div className="about-background" aria-hidden="true">
        <img
          src="src/images/about-space.png"
          alt=""
        />
      </div>

      <div className="about-background-overlay" />

      <div className="about-content">
        <span className="section-label">01 / ABOUT ME</span>

        <h2>
          Turning ideas into
          <span> digital reality.</span>
        </h2>

        <p>
          I'm a Software Engineer passionate about building
          practical web applications, solving real-world problems,
          and turning ideas into simple, effective digital solutions.
        </p>

        <p>
          I enjoy learning new technologies, developing APIs,
          working with databases, and continuously improving my
          software development skills.
        </p>

        <div className="about-signature">
          Abhin Ashok
        </div>
      </div>

      <div className="about-stats">
        <div>
          <strong>1+</strong>
          <span>Years Experience</span>
        </div>

        <div>
          <strong>10+</strong>
          <span>Projects Completed</span>
        </div>

        <div>
          <strong>5+</strong>
          <span>Technologies</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Dedication</span>
        </div>
      </div>

    </section>
  )
}

function Stat({ value, label }) {
  return <div className="glass-panel stat-card"><strong>{value}</strong><span>{label}</span></div>
}
