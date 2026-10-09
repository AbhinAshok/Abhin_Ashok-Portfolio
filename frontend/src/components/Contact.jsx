import { CheckCircle2, Github, Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { sendContactMessage } from '../lib/api'
import Reveal from './Reveal'

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus({ type: '', text: '' })
    try {
      await sendContactMessage(form)
      setForm({ name: '', email: '', subject: '', message: '' })
      setStatus({ type: 'success', text: 'Message sent successfully. I’ll get back to you soon.' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section-pad contact-section" id="contact">
      <div className="container">
        <div className="contact-shell">
          <Reveal className="contact-copy">
            <span className="eyebrow">05 / Get in touch</span>
            <h2>Let's build something <span className="gradient-text">amazing together.</span></h2>
            <p>Have a project, opportunity or technical idea? Send me a message and let’s talk.</p>
            <div className="contact-details">
              <a href={`mailto:${profile.email}`}><Mail size={18} /><span>{profile.email}</span></a>
              {profile.phone ? <a href={`tel:${profile.phone}`}><span className="detail-icon">#</span><span>{profile.phone}</span></a> : null}
              <span><MapPin size={18} /><span>{profile.location}</span></span>
            </div>
            <div className="social-row large-social">
              <a href={profile.github_url || '#'} target="_blank" rel="noreferrer"><Github size={18} /></a>
              <a href={profile.linkedin_url || '#'} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
              <a href={profile.instagram_url || '#'} target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            </div>
          </Reveal>

          <Reveal className="glass-panel contact-form-panel" delay={100}>
            <form onSubmit={submit}>
              <div className="form-grid">
                <label><span>Your name</span><input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Abhin" /></label>
                <label><span>Your email</span><input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></label>
              </div>
              <label><span>Subject</span><input required value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="Project enquiry" /></label>
              <label><span>Message</span><textarea required rows="6" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell me a little about your project..." /></label>
              <button className="button button-primary submit-button" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <Send size={17} /></button>
              {status.text ? <div className={`form-status ${status.type}`}>{status.type === 'success' ? <CheckCircle2 size={17} /> : null}{status.text}</div> : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
