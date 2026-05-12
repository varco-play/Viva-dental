'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Phase-based approach gives precise control over enter/leave transitions.
// 'entering'  → opacity 0, scale 0.95, blur 8px  (no transition — initial paint state)
// 'visible'   → opacity 1, scale 1,    blur 0     (0.44s ease-out — logo appears)
// 'leaving'   → opacity 0, scale 1.02, blur 4px  (0.38s ease-in  — logo disappears)
// 'gone'      → unmounted
type Phase = 'entering' | 'visible' | 'leaving' | 'gone'

// Timeline (total ≈ 1.75s):
//   0ms    — mount, phase='entering' (instant, no transition)
//   ~4ms   — phase='visible'  → 0.44s enter animation
//   1300ms — progress bar CSS animation completes
//   1380ms — phase='leaving'  → 0.38s leave animation starts
//   1760ms — phase='gone'     → unmount

export default function HomePreloader() {
  const [phase, setPhase] = useState<Phase>('entering')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Double rAF: first frame paints the 'entering' state (opacity 0).
    // Second frame triggers the transition to 'visible'.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setPhase('visible'))
      return () => cancelAnimationFrame(raf2)
    })

    const leaveTimer   = setTimeout(() => setPhase('leaving'), 1380)
    const unmountTimer = setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, 1760)
    // Safety — always releases scroll + unmounts even if something goes wrong
    const safetyTimer  = setTimeout(() => {
      setPhase('gone')
      document.body.style.overflow = ''
    }, 4000)

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
        /* ── Overlay ─────────────────────────────────────────────── */
        .pl-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          /* opacity and pointer-events are set by phase classes below */
        }
        .pl-overlay-visible {
          opacity: 1;
          pointer-events: auto;
        }
        .pl-overlay-leaving {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.40s ease-out;
        }

        /* ── Logo + bar container ────────────────────────────────── */
        .pl-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        /* Initial paint — no transition so it's invisible immediately */
        .pl-entering {
          opacity: 0;
          transform: scale(0.95) translateY(8px);
          filter: blur(8px);
          transition: none;
        }
        /* Enter: transition defined before values change → browser animates */
        .pl-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0px);
          transition:
            opacity   0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter    0.44s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        /* Leave: slight scale-up + blur-out = premium dissolve */
        .pl-leaving {
          opacity: 0;
          transform: scale(1.02);
          filter: blur(4px);
          transition:
            opacity   0.36s ease-in,
            transform 0.36s ease-in,
            filter    0.36s ease-in;
        }

        /* ── Progress bar ────────────────────────────────────────── */
        .pl-track {
          width: 10rem;
          height: 3px;
          background: #f0f0f0;
          border-radius: 9999px;
          overflow: hidden;
        }
        @media (min-width: 640px) { .pl-track { width: 13rem; } }

        .pl-bar {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0C1C3A 0%, #1A4FA0 55%, #27AE60 100%);
          /* ease-out: fills quickly at start, decelerates near 100% — no jump */
          animation: pl-fill 1.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes pl-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Reduced motion ──────────────────────────────────────── */
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
            className="w-36 sm:w-48 md:w-56 h-auto"
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
