"use client";

import { useState } from "react";
import { SWATCHES } from "@/lib/tokens";

const LINKS = [
  {
    key: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/josephzampitella", 
    external: true,
    icon: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    ),
  },
  {
    key: "github-personal",
    title: "GitHub — Personal",
    href: "https://github.com/JoeZamp98",
    external: true,
    icon: (
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55l-.01-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.78 2.7 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.96 10.96 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16l-.01 3.2c0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    ),
  },
  {
    key: "github-work",
    title: "GitHub — Professional",
    href: "https://github.com/jzampitellairc", 
    external: true,
    icon: (
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55l-.01-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.78 2.7 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.96 10.96 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16l-.01 3.2c0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    ),
  },
  {
    key: "resume",
    title: "Download Resume",
    href: "/resume.pdf",
    download: true,
    icon: (
      <path
        d="M12 3v11.25m0 0-3.5-3.5m3.5 3.5 3.5-3.5M5 20h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

function IconLink({ link }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      title={link.title}
      aria-label={link.title}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(link.download ? { download: true } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        color: hovered ? SWATCHES.tobacco : SWATCHES.charcoal50,
        transition: "color 0.15s ease",
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {link.icon}
      </svg>
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
      {LINKS.map((link) => (
        <IconLink key={link.key} link={link} />
      ))}
    </div>
  );
}
