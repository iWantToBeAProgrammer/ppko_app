import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", // Replace with your allowed hostname
      },
    ],
  },
};

export default nextConfig;
