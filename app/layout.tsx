import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Kesit Swimming Club",
  description:
    "Belajar renang aman, disiplin, dan berprestasi bersama Kesit Swimming Club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${montserrat.variable} bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}