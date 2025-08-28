import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
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
