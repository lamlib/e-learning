import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmFlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-flex-sans',
  subsets: ['latin'],
});

const ibmFlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-flex-mono',
  weight: '500',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "E-learning",
  description: "E-learning for factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmFlexSans.variable} ${ibmFlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
