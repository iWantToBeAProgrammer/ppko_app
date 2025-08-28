import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/common/navbar-wrapper";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AuthStoreProvider from "@/providers/auth-store-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import Navbar from "@/components/common/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stunting Calculator | Cek Pertumbuhan Anak",
    template: "%s | Stunting Calculator",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description:
    "Aplikasi cek status gizi dan pertumbuhan anak. Gunakan kalkulator stunting untuk memantau kesehatan anak Anda secara praktis dan akurat.",
  keywords: [
    "stunting",
    "kalkulator stunting",
    "pertumbuhan anak",
    "status gizi",
    "kesehatan anak",
    "monitoring tinggi badan",
  ],
  authors: [{ name: "Rumah Sahabat", url: "https://contoh-domain.com" }],
  creator: "Rumah Sahabat",
  publisher: "Rumah Sahabat",
  metadataBase: new URL("https://contoh-domain.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const profile = JSON.parse(cookiesStore.get("user")?.value ?? "{}");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthStoreProvider profile={profile}>
            <Navbar />
            {children}
            <Toaster position="top-center" />
          </AuthStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
