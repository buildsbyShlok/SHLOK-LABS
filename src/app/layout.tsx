import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shlok Rajput — Robotics & Full Stack Engineer",
  description:
    "Building intelligent systems that connect software with the physical world. Robotics, Embedded Systems, IoT, AI & Full Stack Software.",
  keywords: [
    "Shlok Rajput",
    "Robotics Engineer",
    "Embedded Systems",
    "IoT",
    "Full Stack Developer",
    "AI",
    "Computer Vision",
    "SLAM",
    "ROS",
    "ESP32",
    "Raspberry Pi",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Shlok Rajput" }],
  openGraph: {
    title: "Shlok Rajput — Robotics & Full Stack Engineer",
    description:
      "Building intelligent systems that connect software with the physical world.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Rajput — Robotics & Full Stack Engineer",
    description:
      "Building intelligent systems that connect software with the physical world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full antialiased" style={{ colorScheme: 'dark' }}>
      <body
        className="min-h-full flex flex-col bg-[#0a0a0a] text-[#fafafa]"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
