"use client";

import Image from "next/image";
import { SWATCHES } from "@/lib/tokens";
import Typewriter from "@/components/Typewriter";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import SocialLinks from "@/components/SocialLinks";

const TILES = [
  { label: "Resume", sub: "Experience & skills", href: "/resume" },
  { label: "Portfolio", sub: "Projects & work", href: "/portfolio" },
  { label: "Photography", sub: "Personal work", href: "/photography" },
];

const STACK = [
  "Python",
  "TypeScript",
  "React",
  "FastAPI",
  "AWS Lambda",
  "Step Functions",
  "MongoDB",
  "Snowflake",
  "PostgreSQL",
  "Next.js",
  "GitHub Actions",
  "Docker",
  "Auth0",
  "Salesforce",
  "Gong",
  "EventBridge",
];

export default function Home() {
  const doubled = [...STACK, ...STACK];

  return (
    <div style={{ paddingTop: 60 }}>
      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 60px); }
        .hero-img  { border-right: 1px solid ${SWATCHES.creamDark}; }
        .hero-photo-frame { width: min(360px, 70%); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-img  { border-right: none; border-bottom: 1px solid ${SWATCHES.creamDark}; padding: 3rem 0 !important; }
          .hero-photo-frame { width: min(300px, 60%); }
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important; } }
      `}</style>

      <div className="hero-grid">
        {/* Left: hero headshot — a fixed-proportion framed portrait rather
            than a full-bleed panel, so it sits closer in visual weight to
            the text column instead of towering over it. */}
        <div
          className="hero-img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
          }}
        >
          <div
            className="hero-photo-frame"
            style={{
              position: "relative",
              aspectRatio: "3.25 / 5",
              overflow: "hidden",
              border: `1px solid ${SWATCHES.creamDark}`,
            }}
          >
            <Image
              src="/photos/headshots/hero-headshot.jpg"
              alt="Joe Zampitella"
              fill
              priority
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 60vw, 360px"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 40%)",
              }}
            />
          </div>
        </div>

        {/* Right: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem clamp(1.5rem, 5vw, 5rem) 5rem 4rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-abolition)",
              fontSize: "clamp(4rem, 6.5vw, 8rem)",
              lineHeight: 1.0,
              color: SWATCHES.charcoal,
              marginBottom: "0.75rem",
            }}
          >
            Joseph Zampitella
          </h1>

          <div style={{ minHeight: "1.4em", marginBottom: "2.5rem" }}>
            <Typewriter />
          </div>
          <div
            style={{
              width: "56px",
              height: "2px",
              background: `linear-gradient(to right, ${SWATCHES.brass}, ${SWATCHES.tobacco})`,
              borderRadius: "1px",
              marginBottom: "2.5rem",
            }}
          />
          <div
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              fontWeight: 500,
              color: SWATCHES.tobacco,
              letterSpacing: "0.06em",
              marginBottom: "1.25rem",
            }}
          >
            Full-Stack Engineer · Chicago Booth MBA Candidate
          </div>
          <div style={{ marginBottom: "1.75rem" }}></div>
          <div
            style={{
              fontSize: "0.975rem",
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: "3rem",
            }}
          >
            <p style={{ fontWeight: 400 }}>Thanks for visiting, I'm Joe!</p>
            <p style={{ marginTop: "0.85rem", fontWeight: 400 }}>
              In my current role, I am a full-stack engineer at Veris Insights,
              where I build data platforms, cloud infrastructure, and
              client-facing tools our Fortune 1000 clients use to make talent
              decisions. I came to engineering from the business side, with
              early career experience in research and commercial real estate
              roles, and taught myself how to code and build infrastructure
              along the way. This path has significantly informed my Engineering
              style. My awareness of both business and technical considerations
              empowers me to develop compelling solutions to even the most
              complex challenges.
            </p>
            <p style={{ marginTop: "0.85rem", fontWeight: 400 }}>
              In addition to my current full-time role, I'm gradually pursuing
              an MBA part-time at Chicago Booth, focusing on statistics and
              business law courses. Outside of work and school, you'll often
              find me running, cooking, or forecasting the weather. I am
              planning to relocate from Chicago, IL to New York, NY in early
              2027.
            </p>
          </div>

          <SocialLinks />
          {/* Page tiles */}
          {/* <Timeline/> - may reactivate this but not thilled with the formatting yet.*/}
        </div>
      </div>

      {/* Marquee – may add this back later but removing it for now; I think the content was a bit redundant*/}
      {/* <div
        style={{
          borderTop: `1px solid ${SWATCHES.creamDark}`,
          overflow: "hidden",
          padding: "0.75rem 0",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "4rem",
            whiteSpace: "nowrap",
            animation: "marquee 34s linear infinite",
          }}
        >
          {doubled.map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: SWATCHES.charcoal30,
                letterSpacing: "0.05em",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
}
