import { useEffect } from 'react'
import { usePortfolio } from './hooks/usePortfolio'
import SpaceBackground from './components/SpaceBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Certifications from "./components/Certifications";

export default function App() {
  const { data, loading, error } = usePortfolio()

  useEffect(() => {
    const onScroll = () => document.body.style.setProperty('--scroll-progress', `${window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100}%`)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading && !data.profile) return <div className="loading-screen"><div className="loader-orbit" /><span>Loading portfolio…</span></div>

  return (
    <div className="app-shell">
      <div className="progress-line" />
      <SpaceBackground />
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <Header profile={data.profile} />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <Certifications certifications={data.certifications}/>
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
      {error ? <div className="api-warning">Using local fallback content because the API is unavailable.</div> : null}
    </div>
  )
}
