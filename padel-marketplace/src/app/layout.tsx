import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PadelMarket — Buy & Sell Used Padel Rackets",
    template: "%s | PadelMarket",
  },
  description:
    "Your trusted marketplace for quality pre-owned padel rackets. Browse verified listings, find great deals, or sell your racket with ease.",
  keywords: [
    "padel rackets",
    "used padel",
    "padel marketplace",
    "buy padel racket",
    "sell padel racket",
    "second hand padel",
  ],
  openGraph: {
    title: "PadelMarket — Buy & Sell Used Padel Rackets",
    description:
      "Your trusted marketplace for quality pre-owned padel rackets.",
    type: "website",
    locale: "en_US",
    siteName: "PadelMarket",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
