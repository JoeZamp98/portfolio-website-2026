"use client";

import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "@/lib/tokens";

// ── Edit nodes here — geometry recalculates automatically ──────
const NODES = [
  { label: "Meteorology", year: "" },
  { label: "Data Analysis", year: "2017" },
  { label: "Consulting", year: "2018" },
  { label: "Automation", year: "2021" },
  { label: "Data Engineering", year: "2022" },
  { label: "Full-Stack", year: "2024" },
  { label: "MBA + Product", year: "2025" },
];

const W = 1200,
  H = 200,
  PAD = 80,
  AMP = 62,
  WOBBLE = 6, // secondary harmonic — keeps the curve from reading as a perfect sine
  JITTER_X = 5, // small per-node horizontal offset
  DOT_MIN = 4.5,
  DOT_MAX = 6.5,
  TILT_MAX = 2.5; // degrees, label tilt

const round = (n) => Math.round(n * 1000) / 1000;

// Deterministic 32-bit hash (murmur3 finalizer) — same input always
// produces the same output on server and client, unlike Math.random().
function hash(seed) {
  let x = seed | 0;
  x = Math.imul(x ^ (x >>> 16), 2246822519);
  x = Math.imul(x ^ (x >>> 13), 3266489917);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

function getPoints() {
  return NODES.map((n, i) => {
    const t = NODES.length > 1 ? i / (NODES.length - 1) : 0.5;
    const edge = i === 0 || i === NODES.length - 1;
    const jx = edge ? 0 : (hash(i * 4 + 1) - 0.5) * 2 * JITTER_X;
    const wobble = Math.sin(t * Math.PI * 7 + i * 1.7) * WOBBLE;
    const dot = DOT_MIN + hash(i * 4 + 2) * (DOT_MAX - DOT_MIN);
    const tilt = (hash(i * 4 + 3) - 0.5) * 2 * TILT_MAX;
    return {
      ...n,
      x: round(PAD + t * (W - PAD * 2) + jx),
      y: round(H / 2 + Math.sin(t * Math.PI * 2) * AMP + wobble),
      dot: round(dot),
      tilt: round(tilt),
    };
  });
}

const LABEL_FS = 26,
  YEAR_FS = 18,
  LETTER_SP = 1,
  CHAR_W = 0.6, // rough glyph-width factor for the mono font, in em
  TIER_STEP = 20; // extra px pushed out per escalation when flipping isn't enough

const textWidth = (str, fontSize, spacing = 0) =>
  str ? str.length * fontSize * CHAR_W + Math.max(0, str.length - 1) * spacing : 0;

function nodeBox(pt, above, tier) {
  const off = tier * TIER_STEP;
  const labelY = above ? pt.y - 16 - off : pt.y + 27 + off;
  const yearY = pt.year ? (above ? pt.y - 32 - off : pt.y + 43 + off) : null;
  const w = Math.max(
    textWidth(pt.label, LABEL_FS, LETTER_SP),
    textWidth(pt.year, YEAR_FS),
  );
  const ys = yearY === null ? [labelY] : [labelY, yearY];
  return {
    x1: pt.x - w / 2,
    x2: pt.x + w / 2,
    y1: Math.min(...ys) - LABEL_FS * 0.8,
    y2: Math.max(...ys) + LABEL_FS * 0.3,
    labelY,
    yearY,
  };
}

const boxesOverlap = (a, b) =>
  a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;

// Greedily places each label above or below its dot, checking the ACTUAL
// rendered bounding box against the previous label — not just "which side
// of the curve" — since two dots at very different heights can still put
// same-side-toggled labels at nearly the same absolute y. Escalates to a
// bigger offset tier only if flipping sides still isn't enough room.
function layoutLabels(pts) {
  const layout = [];
  let prevBox = null;
  for (const pt of pts) {
    const natural = pt.y < H / 2 - 4;
    let chosen = null;
    for (let tier = 0; tier <= 3 && !chosen; tier++) {
      for (const above of [natural, !natural]) {
        const box = nodeBox(pt, above, tier);
        if (!prevBox || !boxesOverlap(box, prevBox)) {
          chosen = box;
          break;
        }
      }
    }
    layout.push(chosen ?? nodeBox(pt, natural, 0));
    prevBox = layout[layout.length - 1];
  }
  return layout;
}

function buildPath(pts) {
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1],
      c = pts[i];
    const mx = round((p.x + c.x) / 2);
    d += ` C${mx},${p.y} ${mx},${c.y} ${c.x},${c.y}`;
  }
  return d;
}

export default function Timeline() {
  const pathRef = useRef(null);
  const [len, setLen] = useState(2000);
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(new Set());

  const pts = getPoints();
  const d = buildPath(pts);
  const layout = layoutLabels(pts);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (pathRef.current) setLen(pathRef.current.getTotalLength());

    if (reduced) {
      setActive(true);
      setShown(new Set(NODES.map((_, i) => i)));
      return;
    }

    const timers = [
      setTimeout(() => setActive(true), 150),
      ...NODES.map((_, i) =>
        setTimeout(() => setShown((s) => new Set([...s, i])), 650 + i * 210),
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 480, marginTop: "0.25rem" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        aria-label="Career timeline"
      >
        {/* Wave path */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={SWATCHES.brass}
          strokeWidth={1.5}
          opacity={0.45}
          strokeDasharray={len}
          strokeDashoffset={active ? 0 : len}
          style={{
            transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {pts.map((pt, i) => {
          const vis = shown.has(i);
          const { labelY, yearY } = layout[i];

          return (
            <g
              key={i}
              style={{ opacity: vis ? 1 : 0, transition: "opacity 0.5s ease" }}
            >
              <g transform={`rotate(${pt.tilt} ${pt.x} ${pt.y})`}>
                {/* Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.dot}
                  fill={SWATCHES.cream}
                  stroke={SWATCHES.tobacco}
                  strokeWidth={1.5}
                />
                {/* Label */}
                <text
                  x={pt.x}
                  y={labelY}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 26,
                    fill: SWATCHES.charcoal,
                    letterSpacing: 1,
                  }}
                >
                  {pt.label}
                </text>
                {/* Year */}
                {pt.year && (
                  <text
                    x={pt.x}
                    y={yearY}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 18,
                      fill: SWATCHES.charcoal50,
                    }}
                  >
                    {pt.year}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
