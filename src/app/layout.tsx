import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DSpace Jubilee International Conference 2026",
  description:
    "Commemorating more than two decades of open-source repository innovation, institutional preservation, and academic scholarship under Lyrasis community governance.",
  icons: {
    icon: [
      { url: "/dspace-logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/dspace-logo.png",
    apple: "/dspace-logo.png",
  },
  themeColor: "#92C644",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#0C1B33] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
