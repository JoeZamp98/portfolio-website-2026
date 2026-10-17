"use client";
import { useState } from "react";
import { FEATURED, POSTS } from "../../lib/data/portfolio";
import SectionLabel from "../../components/SectionLabel";
import { SWATCHES } from "../../lib/tokens";
import Link from "next/link";

const ALL_TAGS = [
  "All",
  "Engineering",
  "Product",
  "AI",
  "Weather",
  "Photography",
  "Writing",
];

const TYPE_COLORS = {
  Project: SWATCHES.tobacco,
  Writing: SWATCHES.navy,
  Weather: SWATCHES.olive,
  Photography: SWATCHES.brass,
};

function FeaturedCard({ item }) {
  return (
    <Link href={`/portfolio/${item.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          flexShrink: 0,
          width: "clamp(280px, 40vw, 420px)",
          height: "360px",
          background: item.accent,
          borderRadius: "8px",
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          scrollSnapAlign: "start",
          cursor: item.link ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => item.link && window.open(item.link, "_blank")}
      >
        {/* subtle top gradient for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "3px",
                padding: "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.9rem",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          {item.title}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.65,
          }}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const typeColor = TYPE_COLORS[post.type] || SWATCHES.charcoal50;

  return (
    <Link href={`/portfolio/${post.id}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => post.link && window.open(post.link, "_blank")}
        style={{
          border: `1px solid ${hovered ? SWATCHES.creamDark : SWATCHES.creamDark}`,
          borderRadius: "6px",
          padding: "24px",
          background: hovered ? SWATCHES.creamMid : SWATCHES.cream,
          transition: "background 0.18s ease, transform 0.18s ease",
          transform: hovered ? "translateY(-2px)" : "none",
          cursor: post.link ? "pointer" : "default",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: typeColor,
            }}
          >
            {post.type}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: SWATCHES.charcoal50,
            }}
          >
            {post.date}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: SWATCHES.charcoal,
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 300,
            color: SWATCHES.charcoal,
            lineHeight: 1.65,
          }}
        >
          {post.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginTop: "4px",
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: SWATCHES.charcoal50,
                border: `1px solid ${SWATCHES.creamDark}`,
                borderRadius: "3px",
                padding: "1px 7px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? POSTS
      : POSTS.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <style>{`
        .featured-scroll::-webkit-scrollbar { display: none; }
        .featured-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 32px" }}
      >
        {/* Header */}
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
            Work &amp; Writing
          </h1>
        </div>

        {/* Featured row */}
        <div style={{ marginBottom: "72px" }}>
          <SectionLabel
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 800,
              fontSize: "1.5rem",
            }}
          >
            Featured
          </SectionLabel>
          <div
            className="featured-scroll"
            style={{
              display: "flex",
              gap: "16px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "8px",
            }}
          >
            {FEATURED.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Posts feed */}
        <div>
          <SectionLabel
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 800,
              fontSize: "1.5rem",
            }}
          >
            Updates
          </SectionLabel>

          {/* Tag filter */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  padding: "6px 16px",
                  border: `1px solid ${activeTag === tag ? SWATCHES.tobacco : SWATCHES.creamDark}`,
                  borderRadius: "3px",
                  background:
                    activeTag === tag ? SWATCHES.tobacco : "transparent",
                  color:
                    activeTag === tag ? SWATCHES.cream : SWATCHES.charcoal50,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
