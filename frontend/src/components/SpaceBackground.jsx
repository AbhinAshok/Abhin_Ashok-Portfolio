import { useEffect, useRef } from 'react'

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let stars = []
    let width = 0
    let height = 0
    const mouse = { x: 0, y: 0 }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      stars = Array.from({ length: Math.max(90, Math.floor(width / 12)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.8 + 0.2,
        s: Math.random() * 0.25 + 0.05,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const onMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        const twinkle = star.a + Math.sin(time * 0.0015 + star.phase) * 0.12
        const parallaxX = (mouse.x - width / 2) * star.r * 0.002
        const parallaxY = (mouse.y - height / 2) * star.r * 0.002
        star.y += star.s
        if (star.y > height + 3) star.y = -3
        ctx.beginPath()
        ctx.fillStyle = `rgba(80, 190, 255, ${Math.max(0.08, twinkle)})`
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    animationFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="space-canvas" aria-hidden="true" />
}
