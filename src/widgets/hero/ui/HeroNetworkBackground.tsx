'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

type Point = {
  baseX: number
  baseY: number
  x: number
  y: number
  phase: number
}

const getPseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453

  return value - Math.floor(value)
}

export const HeroNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement

    if (!canvas || !section) return

    const context = canvas.getContext('2d')

    if (!context) return

    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    }
    let points: Point[] = []
    let frameId = 0
    let width = 0
    let height = 0

    const createPoints = () => {
      const spacing = width < 640 ? 58 : 76
      const columns = Math.ceil(width / spacing) + 3
      const rows = Math.ceil(height / spacing) + 3
      const nextPoints: Point[] = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const seed = row * 97 + column * 53
          const jitterX = (getPseudoRandom(seed) - 0.5) * spacing * 0.86
          const jitterY = (getPseudoRandom(seed + 11) - 0.5) * spacing * 0.86
          const shouldSkip = getPseudoRandom(seed + 23) < 0.12

          if (shouldSkip) continue

          const baseX = column * spacing - spacing + jitterX
          const baseY = row * spacing - spacing + jitterY

          nextPoints.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            phase: getPseudoRandom(seed + 31) * Math.PI * 2,
          })
        }
      }

      points = nextPoints
    }

    const resize = () => {
      const rect = section.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      createPoints()
    }

    const updatePointer = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const resetPointer = () => {
      pointer.active = false
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)

      points.forEach(point => {
        const idleX = Math.sin(time / 1700 + point.phase) * 2.5
        const idleY = Math.cos(time / 1900 + point.phase) * 2.5
        let targetX = point.baseX + idleX
        let targetY = point.baseY + idleY

        if (pointer.active) {
          const dx = point.baseX - pointer.x
          const dy = point.baseY - pointer.y
          const distance = Math.hypot(dx, dy)
          const radius = 150

          if (distance < radius) {
            const force = (1 - distance / radius) * 34
            const angle = Math.atan2(dy, dx)
            targetX += Math.cos(angle) * force
            targetY += Math.sin(angle) * force
          }
        }

        point.x += (targetX - point.x) * 0.08
        point.y += (targetY - point.y) * 0.08
      })

      for (let i = 0; i < points.length; i += 1) {
        const current = points[i]

        for (let j = i + 1; j < points.length; j += 1) {
          const next = points[j]
          const distance = Math.hypot(current.x - next.x, current.y - next.y)

          if (distance < 118) {
            const opacity = (1 - distance / 118) * 0.22
            context.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(current.x, current.y)
            context.lineTo(next.x, next.y)
            context.stroke()
          }
        }
      }

      points.forEach(point => {
        const distanceToPointer = pointer.active
          ? Math.hypot(point.x - pointer.x, point.y - pointer.y)
          : 1000
        const isNearPointer = distanceToPointer < 150
        const radius = isNearPointer ? 3.2 : 2.2

        context.fillStyle = isNearPointer ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.42)'
        context.beginPath()
        context.arc(point.x, point.y, radius, 0, Math.PI * 2)
        context.fill()
      })

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    frameId = window.requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    section.addEventListener('mousemove', updatePointer)
    section.addEventListener('mouseleave', resetPointer)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove', updatePointer)
      section.removeEventListener('mouseleave', resetPointer)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.networkCanvas} aria-hidden="true" />
}
