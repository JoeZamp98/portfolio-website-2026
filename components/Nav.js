"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SWATCHES } from "@/lib/tokens";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Photography", href: "/photography" },
];

<style>{`
  @media (max-width: 480px) {
    .nav-links a, .nav-links button { padding: 0.4rem 0.45rem !important; font-size: 0.7rem !important; }
  }
`}</style>;

export default function Nav() {
  const pathname = usePathname();
  const [logoHovered, setLogoHovered] = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 60,
        background: SWATCHES.cream,
        borderBottom: `1px solid ${SWATCHES.creamDark}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      <Link
        href="/"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        style={{
          fontFamily: "var(--font-abolition)",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: logoHovered ? SWATCHES.tobacco : SWATCHES.charcoal,
          textDecoration: "none",
          transition: "color 0.15s",
        }}
      >
        Joe Zampitella
      </Link>

      <nav style={{ display: "flex", gap: 2 }} className="nav-links">
        {LINKS.map(({ label, href }) => {
          const active = pathname === href;
          const hovered = hoveredHref === href;
          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredHref(href)}
              onMouseLeave={() => setHoveredHref(null)}
              style={{
                fontSize: "0.8rem",
                fontWeight: 400,
                color: active
                  ? SWATCHES.charcoal
                  : hovered
                    ? SWATCHES.charcoal
                    : SWATCHES.charcoal50,
                borderBottom: active
                  ? `1.5px solid ${SWATCHES.tobacco}`
                  : hovered
                    ? `1.5px solid ${SWATCHES.charcoal30}`
                    : "1.5px solid transparent",
                padding: "0.4rem 0.75rem",
                transition: "color 0.15s, border-color 0.15s",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
