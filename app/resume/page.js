"use client";

import { useState, useEffect, useRef } from "react";
import { SWATCHES } from "@/lib/tokens";
import { WORK, EDUCATION, STACK_CELLS, PURSUITS } from "@/lib/data/resume";
import SectionLabel from "@/components/SectionLabel";
import Tag from "@/components/Tag";

const SECTIONS = ["experience", "stack", "education", "pursuits"];

function JobEntry({ job }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px 20px",
        borderRadius: "6px",
        background: hovered ? SWATCHES.creamMid : "transparent",
        transition: "background 0.18s ease",
        marginLeft: "-20px",
        marginRight: "-20px",
      }}
    >
      <div
        style={{
          fontWeight: 900,
          fontSize: "1.1rem",
          color: SWATCHES.tobacco,
          marginBottom: "0.5rem",
        }}
      >
        {job.role}
      </div>
      <div
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>
          {job.company}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: SWATCHES.charcoal50,
          }}
        >
          {job.dates}
        </span>
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.75,
          maxWidth: 640,
        }}
      >
        {job.body.map((p, j) => (
          <p key={j} style={{ marginTop: j > 0 ? "0.6rem" : 0 }}>
            {p}
          </p>
        ))}
      </div>
      {job.tags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "0.45rem",
            marginTop: "1rem",
          }}
        >
          {job.tags.map((t, idx) => (
            <span
              key={t}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "0.45rem",
              }}
            >
              {idx > 0 && <span style={{ color: SWATCHES.tobacco }}>·</span>}
              <Tag>{t}</Tag>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Resume() {
  const [active, setActive] = useState("experience");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredStack, setHoveredStack] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.section);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) =>
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ paddingTop: 60 }}>
      <style>{`
        .resume-layout { display: grid; grid-template-columns: 200px 1fr; min-height: calc(100vh - 60px); }
        @media (max-width: 768px) {
          .resume-layout { grid-template-columns: 1fr; }
          .resume-aside { position: static !important; height: auto !important; flex-direction: row !important; flex-wrap: wrap !important; padding: 1.25rem 1.5rem !important; border-right: none !important; border-bottom: 1px solid ${SWATCHES.creamDark} !important; }
        }
      `}</style>

      <div className="resume-layout">
        {/* Sidebar */}
        <aside
          className="resume-aside"
          style={{
            position: "sticky",
            top: 60,
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            padding: "3rem 1.75rem 3rem 2rem",
            borderRight: `1px solid ${SWATCHES.creamDark}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {SECTIONS.map((s) => {
                const isActive = active === s;
                const isHovered = hoveredSection === s;
                return (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo(s)}
                      onMouseEnter={() => setHoveredSection(s)}
                      onMouseLeave={() => setHoveredSection(null)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        fontSize: "1rem",
                        color: isActive
                          ? SWATCHES.charcoal
                          : isHovered
                            ? SWATCHES.charcoal
                            : SWATCHES.charcoal50,
                        padding: "1rem 0 1rem 0.65rem",
                        background: "none",
                        border: "none",
                        borderLeft: `1.5px solid ${
                          isActive
                            ? SWATCHES.tobacco
                            : isHovered
                              ? SWATCHES.charcoal30
                              : "transparent"
                        }`,
                        transition: "color 0.12s, border-color 0.12s",
                        cursor: "pointer",
                        fontFamily: "var(--font-cormorant)",
                      }}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <a
            href="/resume.pdf"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: SWATCHES.tobacco,
              letterSpacing: "0.04em",
              border: `1px solid ${SWATCHES.tobacco}`,
              padding: "0.55rem 0.9rem",
              display: "inline-block",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = SWATCHES.tobacco;
              e.currentTarget.style.color = SWATCHES.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = SWATCHES.tobacco;
            }}
          >
            Download PDF
          </a>
        </aside>

        {/* Main content */}
        {/* paddingBottom gives the last section room to scroll up into the
            IntersectionObserver's activation band — without it, a short or
            final section can hit the end of the page before its top ever
            reaches the band, so it never registers as active. */}
        <main
          style={{ padding: "0 clamp(1.5rem, 5vw, 5rem) 50vh", maxWidth: 800 }}
        >
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
              Background in Brief
            </h1>
          </div>
          {/* Experience */}
          <section
            ref={(el) => (refs.current["experience"] = el)}
            data-section="experience"
            style={{
              padding: "1rem 0 3.5rem",
              borderBottom: `1px solid ${SWATCHES.creamDark}`,
            }}
          >
            <SectionLabel
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Experience
            </SectionLabel>
            <div style={{ position: "relative", paddingLeft: "20px" }}>
              {/* Vertical accent line */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0px",
                  bottom: "0px",
                  width: "1px",
                  zIndex: 1,
                  background: `linear-gradient(to bottom, ${SWATCHES.tobacco}, ${SWATCHES.brass})`,
                  borderRadius: "1px",
                }}
              />

              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {WORK.map((job, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    {/* Dot on the line */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-24px",
                        top: "26px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: SWATCHES.cream,
                        border: `2px solid ${SWATCHES.tobacco}`,
                        zIndex: 1,
                      }}
                    />
                    <JobEntry job={job} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stack */}
          <section
            ref={(el) => (refs.current["stack"] = el)}
            data-section="stack"
            style={{
              padding: "4rem 0 3.5rem",
              borderBottom: `1px solid ${SWATCHES.creamDark}`,
            }}
          >
            <SectionLabel
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Stack
            </SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: `1px solid ${SWATCHES.creamDark}`,
                borderLeft: `1px solid ${SWATCHES.creamDark}`,
              }}
            >
              {STACK_CELLS.map((cell, i) => (
                <div
                  onMouseEnter={() => setHoveredStack(i)}
                  onMouseLeave={() => setHoveredStack(null)}
                  key={i}
                  style={{
                    padding: "1.5rem 1.25rem",
                    borderRight: `1px solid ${SWATCHES.creamDark}`,
                    borderBottom: `1px solid ${SWATCHES.creamDark}`,
                    background:
                      hoveredStack === i ? SWATCHES.creamMid : "transparent",
                    transition: "background 0.18s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: SWATCHES.tobacco,
                      letterSpacing: "0.05em",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {cell.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      lineHeight: 2,
                    }}
                  >
                    {cell.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "0.45rem",
                        }}
                      >
                        <span style={{ color: SWATCHES.tobacco }}>·</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section
            ref={(el) => (refs.current["education"] = el)}
            data-section="education"
            style={{ padding: "4rem 0 3.5rem" }}
          >
            <SectionLabel
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 800,
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Education
            </SectionLabel>
            {EDUCATION.map((e, i) => (
              <div
                onMouseEnter={() => setHoveredSection(i)}
                onMouseLeave={() => setHoveredSection(null)}
                key={i}
                style={{
                  borderTop: i > 0 ? `1px solid ${SWATCHES.creamDark}` : "none",
                  background:
                    hoveredSection === i ? SWATCHES.creamMid : "transparent",
                  padding: "1.5rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <span style={{ fontWeight: 500, fontSize: "0.975rem" }}>
                    {e.school}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: SWATCHES.charcoal50,
                    }}
                  >
                    {e.dates}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.825rem",
                    color: SWATCHES.tobacco,
                    marginBottom: "0.5rem",
                  }}
                >
                  {e.degree}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    maxWidth: 580,
                  }}
                >
                  {e.detail}
                </div>
              </div>
            ))}
          </section>

          <section
            id="pursuits"
            ref={(el) => (refs.current["pursuits"] = el)}
            style={{ marginBottom: "72px" }}
          >
            <SectionLabel
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 800,
                fontSize: "1.5rem",
              }}
            >
              Pursuits &amp; Engagements
            </SectionLabel>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "36px" }}
            >
              {PURSUITS.map((group, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: SWATCHES.brass,
                      marginBottom: "12px",
                    }}
                  >
                    {group.category}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {group.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          maxWidth: "480px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            color: SWATCHES.charcoal,
                          }}
                        >
                          {item.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            color: SWATCHES.charcoal50,
                          }}
                        >
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
