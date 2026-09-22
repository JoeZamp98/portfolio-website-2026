import { Playfair_Display, IBM_Plex_Mono, Inter } from "/next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Joe Zampitella",
  description: "Full-Stack Engineer · Chicago Booth MBA Candidate",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${mono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
