import { SWATCHES } from "@/lib/tokens";

export default function SectionLabel({ children, style }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        color: SWATCHES.tobacco,
        letterSpacing: "0.07em",
        marginBottom: "2.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        ...style,
      }}
    >
      {children}
      <span
        style={{
          display: "block",
          width: 40,
          height: 1,
          background: SWATCHES.brass,
          opacity: 0.4,
        }}
      ></span>
    </div>
  );
}
