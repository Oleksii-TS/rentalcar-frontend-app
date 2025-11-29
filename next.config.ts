import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["zustand", "axios"],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "ftp.goit.study",
      "car-rental-api.goit.global",
      "localhost",
    ],
  },
};

export default nextConfig;
