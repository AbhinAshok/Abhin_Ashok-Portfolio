import { useEffect, useState } from 'react'
import { getPortfolio } from '../lib/api'

const fallback = {
  profile: {
    name: 'Abhin Ashok',
    role: 'Python Django Developer',
    headline: 'I build robust, scalable and efficient web applications that solve real-world problems and deliver great user experiences.',
    about: 'I am a passionate Python Django Developer focused on secure, scalable web applications, REST APIs, databases and modern frontend experiences.',
    location: 'Kerala, India',
    email: 'abhinashok.dev@gmail.com',
    profile_image_url: 'https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/images/Abhin11.png',
    resume_url: './assets/docs/ABHIN_CV.pdf',
    github_url: 'https://github.com/AbhinAshok',
    linkedin_url: 'https://www.linkedin.com/',
    instagram_url: 'https://www.instagram.com/',
  },
  skills: [],
  projects: [],
  experience: [],
}

export function usePortfolio() {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    getPortfolio()
      .then((payload) => mounted && setData(payload))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return { data, loading, error }
}
