import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredokaOne = Fredoka({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka-one",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aytuğ'un Dünyası – Macera, Oyun ve Hayal Gücü",
  description:
    "Macera, oyun ve hayal gücüyle dolu büyülü bir dünyaya hoş geldiniz. Aytuğ'un renkli evrenini keşfedin!",
  openGraph: {
    title: "Aytuğ'un Dünyası",
    description: "Büyülü maceralar ve oyunlar sizi bekliyor!",
    images: ["/images/aytug-hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${fredokaOne.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0f2e]">{children}</body>
    </html>
  );
}
