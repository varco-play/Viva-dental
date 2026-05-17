'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Phase timeline (total ≈ 1.95s):
//   0ms    — 'entering'  : logo invisible (no transition, instant paint)
//   ~4ms   — 'visible'   : logo fades/scales in over 0.44s
//   1350ms — 'leaving'   : logo shrinks + flies UP toward navbar; overlay fades
//   1950ms — 'gone'      : unmounted, body scroll restored
type Phase = 'entering' | 'visible' | 'leaving' | 'gone'

export default function HomePreloader() {
  const [phase, setPhase] = useState<Phase>('entering')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Double rAF: first frame paints the hidden state, second triggers enter transition
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setPhase('visible'))
      return () => cancelAnimationFrame(raf2)
    })

    const leaveTimer   = setTimeout(() => setPhase('leaving'), 1350)
    const unmountTimer = setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, 1950)
    const safetyTimer  = setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, 5000)

    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(leaveTimer)
      clearTimeout(unmountTimer)
      clearTimeout(safetyTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <>
      <style>{`
        /* ── Overlay ─────────────────────────────────────────── */
        .pl-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          overflow: hidden;
        }
        .pl-overlay-visible  { opacity: 1; pointer-events: auto; }
        .pl-overlay-leaving  {
          opacity: 0;
          pointer-events: none;
          /* Overlay fades a touch slower than logo moves, so navbar is
             revealed only after the logo "lands" there */
          transition: opacity 0.55s cubic-bezier(0.4, 0, 0.6, 1) 0.05s;
        }

        /* ── Logo + bar wrapper ───────────────────────────────── */
        .pl-content { display: flex; flex-direction: column; align-items: center; gap: 2rem; }

        /* Initial hidden state — no transition so it paints invisible */
        .pl-entering {
          opacity: 0;
          transform: scale(0.94) translateY(10px);
          filter: blur(10px);
          transition: none;
        }

        /* Enter: material into existence */
        .pl-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0px);
          transition:
            opacity   0.46s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.46s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter    0.46s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* Leave: shrink + fly UP toward the navbar position.
           The navbar logo (z-50) is always behind this overlay (z-200).
           As this overlay fades, the navbar reveals — creating the illusion
           that the logo "flew" from the center to the navbar. */
        .pl-leaving {
          opacity: 0;
          /* translateY moves up first (original coords), scale shrinks it */
          transform: translateY(-46vh) scale(0.38);
          filter: blur(0px);
          transition:
            opacity   0.52s cubic-bezier(0.4, 0, 1, 1),
            transform 0.58s cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* ── Progress bar ─────────────────────────────────────── */
        .pl-track {
          width: 10rem;
          height: 3px;
          background: #efefef;
          border-radius: 9999px;
          overflow: hidden;
        }
        @media (min-width: 640px) { .pl-track { width: 13rem; } }

        .pl-bar {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0C1C3A 0%, #1A4FA0 55%, #27AE60 100%);
          animation: pl-fill 1.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes pl-fill { from { width: 0% } to { width: 100% } }

        /* ── Reduced motion ───────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .pl-entering, .pl-visible, .pl-leaving {
            transition: opacity 0.12s ease !important;
            transform: none !important;
            filter: none !important;
          }
          .pl-overlay-leaving { transition-duration: 0.12s !important; }
          .pl-bar { animation-duration: 0.2s !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`pl-overlay ${phase === 'leaving' ? 'pl-overlay-leaving' : 'pl-overlay-visible'}`}
      >
        <div
          className={`pl-content ${
            phase === 'entering' ? 'pl-entering' :
            phase === 'leaving'  ? 'pl-leaving'  :
            'pl-visible'
          }`}
        >
          <Image
            src="/logo.png"
            alt="Viva Dental Group"
            width={240}
            height={113}
            className="w-36 sm:w-48 md:w-52 h-auto"
            priority
          />
          <div className="pl-track">
            <div className="pl-bar" />
          </div>
        </div>
      </div>
    </>
  )
}
