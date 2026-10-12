"use client";

import { useState, useEffect, useRef } from "react";
import { SWATCHES } from "@/lib/tokens";

const LINES = [
  "FastAPI + React + AWS Lambda  →  production",
  "Python · TypeScript · SQL · R  →  daily drivers",
  "zero-to-one platform  →  250+ enterprise clients",
  "Snowflake + MongoDB  →  data layer",
  "LLM pipelines + Gong  →  revenue ops",
];

export default function Typewriter() {
  const [text, setText] = useState("");

  const timer = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(LINES[0]);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const cur = LINES[lineIdx];

      if (!deleting) {
        charIdx += 1;
        setText(cur.slice(0, charIdx));
        if (charIdx === cur.length) {
          deleting = true;
          timer.current = setTimeout(tick, 3000);
        } else timer.current = setTimeout(tick, 110);
      } else {
        charIdx -= 1;
        setText(cur.slice(0, charIdx));

        if (charIdx === 0) {
          deleting = false;
          lineIdx = (lineIdx + 1) % LINES.length;
          timer.current = setTimeout(tick, 600);
        } else timer.current = setTimeout(tick, 55);
      }
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
      {text}
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
          background: SWATCHES.tobacco,
          verticalAlign: "text-bottom",
          animation: "blink 0.9s step-end infinite",
          marginLeft: 1,
        }}
      />
    </span>
  );
}
