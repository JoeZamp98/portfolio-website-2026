"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SWATCHES } from "@/lib/tokens";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Photography", href: "/photography" },
];

export default function Nav() {
  const pathname = usePathname();

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
        style={{
          fontFamily: "var(--font-abolition)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: SWATCHES.charcoal,
          textDecoration: 'none'
        }}
      >
        Joe Zampitella
      </Link>

      <nav style={{ display: "flex", gap: 2 }}>
        {LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.8rem",
                fontWeight: 400,
                color: active ? SWATCHES.charcoal : SWATCHES.charcoal50,
                borderBottom: active
                  ? `1.5px solid ${SWATCHES.tobacco}`
                  : "1.5px solid transparent",
                padding: "0.4rem 0.75rem",
                transition: "color 0.15s, border-color 0.15s",
                textDecoration: 'none'
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
