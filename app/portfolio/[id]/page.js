import Link from 'next/link'
import { FEATURED, POSTS } from '../../../lib/data/portfolio'
import { SWATCHES, T } from '../../../lib/tokens'
import Tag from '../../../components/Tag'

const TYPE_COLORS = {
  Project:     SWATCHES.tobacco,
  Writing:     SWATCHES.navy,
  Weather:     SWATCHES.olive,
  Photography: SWATCHES.brass,
}

export default async function PortfolioItemPage({ params }) {
  const { id } = await params
  const featured = FEATURED.find(f => f.id === id)
  const post = POSTS.find(p => p.id === id)
  const item = featured || post

  if (!item) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 32px' }}>
        <p style={{ fontFamily: 'var(--font-body)', color: SWATCHES.charcoal50 }}>Not found.</p>
      </div>
    )
  }

  return featured
    ? <FeaturedDetail item={featured} />
    : <PostDetail post={post} />
}

function BackLink() {
  return (
    <Link href="/portfolio" style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: SWATCHES.charcoal50,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '48px',
    }}>
      ← Portfolio
    </Link>
  )
}

function FeaturedDetail({ item }) {
  return (
    <>
      {/* Color hero */}
      <div style={{
        background: item.accent,
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 6vw, 80px)',
        marginBottom: '64px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '3px',
                padding: '3px 10px',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}>
            {item.title}
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            maxWidth: '600px',
          }}>
            {item.description}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px) 96px' }}>
        <BackLink />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '64px', alignItems: 'start' }}>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {item.content.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                color: SWATCHES.charcoal,
                lineHeight: 1.8,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* Highlights */}
            {item.highlights && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: SWATCHES.brass,
                  marginBottom: '14px',
                }}>
                  Highlights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {item.highlights.map((h, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: SWATCHES.charcoal50, marginBottom: '2px' }}>
                        {h.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 500, color: SWATCHES.charcoal }}>
                        {h.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stack */}
            {item.stack && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: SWATCHES.brass,
                  marginBottom: '14px',
                }}>
                  Stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.stack.map(s => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            )}

            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: SWATCHES.cream,
                background: SWATCHES.charcoal,
                padding: '10px 14px',
                borderRadius: '4px',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block',
              }}>
                View Project →
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function PostDetail({ post }) {
  const typeColor = TYPE_COLORS[post.type] || SWATCHES.charcoal50

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px clamp(24px, 6vw, 32px) 96px' }}>
      <BackLink />

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: typeColor,
          }}>
            {post.type}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: SWATCHES.charcoal50 }}>
            {post.date}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 500,
          color: SWATCHES.charcoal,
          lineHeight: 1.1,
          marginBottom: '20px',
        }}>
          {post.title}
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontWeight: 300,
          color: SWATCHES.charcoal50,
          lineHeight: 1.65,
          borderLeft: `3px solid ${typeColor}`,
          paddingLeft: '16px',
        }}>
          {post.description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: SWATCHES.creamDark, marginBottom: '48px' }} />

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
        {post.content.map((para, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 300,
            color: SWATCHES.charcoal,
            lineHeight: 1.85,
          }}>
            {para}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </div>
  )
}