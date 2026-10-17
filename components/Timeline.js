'use client'

import { useEffect, useRef, useState } from 'react'
import { SWATCHES } from '@/lib/tokens'

// ── Edit nodes here — geometry recalculates automatically ──────
const NODES = [
  { label: 'Meteorology',   year: '' },
  { label: 'Analytics',     year: '2017' },
  { label: 'Consulting',    year: '2018' },
  { label: 'Automation',    year: '2021' },
  { label: 'Engineering',   year: '2022' },
  { label: 'Full-Stack',    year: '2024' },
  { label: 'MBA + Product', year: '2025' },
]

const W = 1000, H = 500, PAD = 150, AMP = 150

// Math.sin can differ in its last couple of bits between server and
// browser JS engines, which makes the raw value hydrate-mismatch —
// rounding to a fixed precision guarantees the same rendered string.
const round = (n) => Math.round(n * 1000) / 1000

function getPoints() {
  return NODES.map((n, i) => {
    const t = NODES.length > 1 ? i / (NODES.length - 1) : 0.5
    return { ...n,
      x: round(PAD + t * (W - PAD * 2)),
      y: round(H / 2 + Math.sin(t * Math.PI * 2) * AMP),
    }
  })
}

function buildPath(pts) {
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i]
    const mx = (p.x + c.x) / 2
    d += ` C${mx},${p.y} ${mx},${c.y} ${c.x},${c.y}`
  }
  return d
}

export default function Timeline() {
  const pathRef = useRef(null)
  const [len, setLen] = useState(2500)
  const [active, setActive] = useState(false)
  const [shown, setShown] = useState(new Set())

  const pts = getPoints()
  const d = buildPath(pts)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pathRef.current) setLen(pathRef.current.getTotalLength())

    if (reduced) {
      setActive(true)
      setShown(new Set(NODES.map((_, i) => i)))
      return
    }

    const timers = [
      setTimeout(() => setActive(true), 200),
      ...NODES.map((_, i) =>
        setTimeout(() => setShown(s => new Set([...s, i])), 750 + i * 210)
      ),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{ width: '100%', marginTop: '2.5rem' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        aria-label="Career progression"
      >
        <defs>
          <linearGradient id="wave-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0%"   stopColor={SWATCHES.brass}   stopOpacity={0} />
            <stop offset="10%"  stopColor={SWATCHES.brass}   stopOpacity={0.55} />
            <stop offset="88%"  stopColor={SWATCHES.tobacco} stopOpacity={0.45} />
            <stop offset="100%" stopColor={SWATCHES.tobacco} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Wave */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth={1.5}
          strokeDasharray={len}
          strokeDashoffset={active ? 0 : len}
          style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {pts.map((pt, i) => {
          const above = pt.y < H / 2 - 4
          const prevAbove = i > 0 ? pts[i - 1].y < H / 2 - 4 : null
          const stagger = prevAbove === above ? (above ? -18 : 18) : 0
          const vis = shown.has(i)

          const nameY = above ? pt.y - 20 + stagger : pt.y + 38 + stagger
          const yearY = above ? pt.y - 42 + stagger : pt.y + 57 + stagger

          return (
            <g key={i} style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.6s ease' }}>
              {/* Outer ring */}
              <circle cx={pt.x} cy={pt.y} r={8}
                fill={SWATCHES.cream} stroke={SWATCHES.charcoal} strokeOpacity={0.2} strokeWidth={0.75} />
              {/* Inner dot */}
              <circle cx={pt.x} cy={pt.y} r={3} fill={SWATCHES.tobacco} />

              {/* Name — Cormorant italic */}
              <text x={pt.x} y={nameY} textAnchor="middle" style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: 44,
                fontWeight: 400,
                fill: SWATCHES.charcoal,
              }}>{pt.label}</text>

              {/* Year — mono */}
              {pt.year && (
                <text x={pt.x} y={yearY} textAnchor="middle" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 22,
                  fill: SWATCHES.charcoal50,
                }}>{pt.year}</text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}