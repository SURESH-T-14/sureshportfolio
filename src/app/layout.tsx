import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Suresh | Software Engineer',
  description: 'Suresh - Professional Software Engineer Portfolio',
};

export const viewport: Viewport = {
  themeColor: '#07060B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Titillium+Web:wght@400;600;700&family=Share+Tech+Mono&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Browser extensions (Grammarly, DarkReader, etc.) inject attributes
          like data-gr-ext-installed into <body> and form fields before
          React hydrates — that's a real mismatch React would otherwise warn
          about, but it's the extension's doing, not a server/client bug. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
