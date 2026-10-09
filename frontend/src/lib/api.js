const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'https://abhin.pythonanywhere.com'
).replace(/\/+$/, '') + '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = payload.detail || payload.message || Object.values(payload).flat().join(' ') || 'Request failed.'
    throw new Error(message)
  }
  return payload
}

export function getPortfolio() {
  return request('/portfolio/')
}

export function sendContactMessage(data) {
  return request('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
