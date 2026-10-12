"use client"

import { SWATCHES } from '@/lib/tokens'
import Typewriter from '@/components/Typewriter'
import Link from 'next/link'

const TILES = [
  { label: 'Resume',      sub: 'Experience & skills',  href: '/resume' },
  { label: 'Portfolio',   sub: 'Projects & work',      href: '/portfolio' },
  { label: 'Photography', sub: 'Personal work',         href: '/photography' },
]

const STACK = ['Python','TypeScript','React','FastAPI','AWS Lambda','Step Functions',
  'MongoDB','Snowflake','PostgreSQL','Next.js','GitHub Actions','Docker','Auth0','Salesforce','Gong','EventBridge']

export default function Home() {
  const doubled = [...STACK, ...STACK]

  return (
    <div style={{ paddingTop: 60 }}>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 60px); }
        .hero-img  { min-height: 260px; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-img  { height: 260px; min-height: unset; }
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important; } }
      `}</style>

      <div className="hero-grid">

        {/* Left: gradient panel */}
        <div className="hero-img" style={{
          background: 'linear-gradient(160deg, #3A2B1F 0%, #5C3D2E 28%, #7B5438 52%, #4A5240 76%, #2E3F5C 100%)',
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute', bottom: '2rem', left: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'rgba(242,237,228,0.3)', letterSpacing: '0.06em',
          }}>Chicago, IL</span>
        </div>

        {/* Right: text */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '5rem clamp(1.5rem, 5vw, 5rem) 5rem 4rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: SWATCHES.tobacco, letterSpacing: '0.06em', marginBottom: '1.25rem',
          }}>Full-Stack Engineer · Chicago Booth MBA</div>

          <h1 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(3rem, 5.5vw, 5rem)',
            fontWeight: 700, lineHeight: 1.0,
            color: SWATCHES.charcoal, marginBottom: '0.5rem',
          }}>
            Joe<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: SWATCHES.walnut }}>Zampitella</em>
          </h1>

          <div style={{ minHeight: '1.4em', marginBottom: '2.25rem' }}>
            <Typewriter />
          </div>

          <div style={{ fontSize: '0.975rem', lineHeight: 1.8, maxWidth: 440, marginBottom: '3rem' }}>
            <p>I build data platforms, cloud infrastructure, and client-facing products from zero to one — the kind that actually ship and stay running.</p>
            <p style={{ marginTop: '0.85rem' }}>Four years at Veris Insights. 250+ enterprise clients. Evening MBA at Booth. I think hard about both the code and the business case behind it.</p>
          </div>

          {/* Page tiles */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            border: `1px solid ${SWATCHES.creamDark}`, maxWidth: 440,
          }}>
            {TILES.map(({ label, sub, href }, i) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 4,
                  padding: '1rem 1.25rem',
                  borderRight: i < 2 ? `1px solid ${SWATCHES.creamDark}` : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = SWATCHES.creamMid}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: SWATCHES.charcoal }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: SWATCHES.charcoal50 }}>{sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ borderTop: `1px solid ${SWATCHES.creamDark}`, overflow: 'hidden', padding: '0.75rem 0' }}>
        <div className="marquee-track" style={{
          display: 'flex', gap: '4rem', whiteSpace: 'nowrap',
          animation: 'marquee 34s linear infinite',
        }}>
          {doubled.map((w, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: SWATCHES.charcoal30, letterSpacing: '0.05em',
            }}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  )
}