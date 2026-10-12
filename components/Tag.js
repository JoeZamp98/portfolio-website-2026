import { SWATCHES } from "@/lib/tokens";

export default function Tag({ children }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        color: SWATCHES.olive,
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  );
}
