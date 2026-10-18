"use client";

import { useState, useEffect, useRef } from "react";
import { SWATCHES } from "@/lib/tokens";

const LINES = [
  "Mapped thousands of Salesforce contacts to regional hubs using the Haversine algorithm",
  "Built three React-based client data platforms serving hundreds of enterprise clients",
  "Cut publication time for tabular research reports from weeks to minutes",
  "Designed an array of serverless survey processing pipelines in AWS",
];

const TYPE_MS = 26;
const PAUSE_MS = 1800;
const FADE_MS = 350;

export default function Typewriter() {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);

  const timer = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(LINES[0]);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;

    function tick() {
      charIdx += 1;
      setText(LINES[lineIdx].slice(0, charIdx));

      if (charIdx < LINES[lineIdx].length) {
        timer.current = setTimeout(tick, TYPE_MS);
        return;
      }

      // full line typed — hold, then fade out and swap to the next line
      timer.current = setTimeout(() => {
        setVisible(false);
        timer.current = setTimeout(() => {
          lineIdx = (lineIdx + 1) % LINES.length;
          charIdx = 0;
          setText("");
          setVisible(true);
          timer.current = setTimeout(tick, TYPE_MS);
        }, FADE_MS);
      }, PAUSE_MS);
    }

    timer.current = setTimeout(tick, 900);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.82rem",
        color: SWATCHES.navy,
      }}
    >
      <span
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        {text}
      </span>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .cursor { animation: none !important; } }
      `}</style>
      <span
        className="cursor"
        style={{
          display: "inline-block",
          width: 2,
          height: "0.85em",
          background: SWATCHES.navy,
          verticalAlign: "text-bottom",
          animation: "blink 0.9s step-end infinite",
          marginLeft: 1,
        }}
      />
    </span>
  );
}
