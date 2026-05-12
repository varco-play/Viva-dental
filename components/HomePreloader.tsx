'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function HomePreloader() {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [gone, setGone] = useState(false)
  const rafRef = useRef<number>(0)
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Lock scroll while preloader is visible
    document.body.style.overflow = 'hidden'

    const DURATION = 2000 // ms for the bar to fill
    const startTime = performance.now()

    const dismiss = () => {
      setFadeOut(true)
      setTimeout(() => {
        setGone(true)
        document.body.style.overflow = ''
      }, 480)
    }

    const tick = (now: number) => {
      const elapsed = now - startTime
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Brief pause at 100% before fading out
        setTimeout(dismiss, 220)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    // Safety valve — always clears after 4s no matter what
    safetyRef.current = setTimeout(dismiss, 4000)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (safetyRef.current) clearTimeout(safetyRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div
      aria-hidden="true"
      className={`
        fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white
        transition-opacity duration-[480ms] ease-out
        ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Logo */}
      <div
        className={`
          flex flex-col items-center gap-8
          transition-all duration-700 ease-out
          ${fadeOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
      >
        <Image
          src="/logo.png"
          alt="Viva Dental Group"
          width={240}
          height={113}
          className="w-36 sm:w-48 md:w-56 h-auto"
          priority
        />

        {/* Progress track */}
        <div className="w-44 sm:w-60 h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0C1C3A 0%, #1A4FA0 55%, #27AE60 100%)',
              transition: 'width 80ms linear',
            }}
          />
        </div>
      </div>

      {/* prefers-reduced-motion: hide instantly */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #preloader-overlay { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  )
}
