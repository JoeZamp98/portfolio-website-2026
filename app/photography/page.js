'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SWATCHES } from '@/lib/tokens'
import { PHOTOS, COLLECTIONS } from '@/lib/data/photos'

export default function Photography() {
  const [col, setCol] = useState('all')
  const [hovered, setHovered] = useState(null)
  const visible = PHOTOS.filter(p => col === 'all' || p.col === col)

  return (
    <div style={{ background: SWATCHES.cream }}>
      <style>{`
        @media (max-width: 900px) { .photo-masonry { columns: 2 !important; } }
        @media (max-width: 540px) { .photo-masonry { columns: 1 !important; } }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '4rem clamp(1.5rem, 5vw, 5rem) 1rem',
        borderBottom: `1px solid ${SWATCHES.creamDark}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ marginBottom: "48px" }}>
            <h1
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginTop: "4rem",
                fontWeight: 400,
                color: SWATCHES.charcoal,
              }}
            >
              Photography
            </h1>
          </div>
          
        </div>
      </div>

      {/* Collection filter */}
      <div style={{
        display: 'flex', padding: '0 clamp(1.5rem, 5vw, 5rem)',
        borderBottom: `1px solid ${SWATCHES.creamDark}`, overflowX: 'auto',
      }}>
        {COLLECTIONS.map(c => (
          <button key={c.key} onClick={() => setCol(c.key)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.04em',
            color: col === c.key ? SWATCHES.charcoal : SWATCHES.charcoal50,
            padding: '0.85rem 1.25rem',
            background: 'none', border: 'none',
            borderBottom: col === c.key ? `1.5px solid ${SWATCHES.tobacco}` : '1.5px solid transparent',
            whiteSpace: 'nowrap', transition: 'color 0.12s', cursor: 'pointer',
          }}>{c.label}</button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{ padding: '2rem clamp(1.5rem, 5vw, 5rem) 5rem' }}>
        <div className="photo-masonry" style={{ columns: 3, columnGap: 6 }}>
          {visible.map((p, i) => (
            <div
              key={`${p.col}-${p.title}`}
              style={{ breakInside: 'avoid', marginBottom: 6, position: 'relative', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ position: 'relative', aspectRatio: p.ar, overflow: 'hidden' }}>
                {/* Swap the placeholder div below for <Image> once photos are in public/photos/ */}
                <div style={{ width: '100%', height: '100%', background: p.bg }} />
                <Image src={p.src} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw" />

                {/* Hover caption */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(92,61,46,0.55)',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end', padding: '1.25rem',
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.25s',
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: SWATCHES.cream, lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(242,237,228,0.7)', marginTop: '0.25rem' }}>{p.meta}</div>
                </div>
              </div>
            </div>
            
          ))}
          
        </div>
      </div>
    </div>
  )
}