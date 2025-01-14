import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for catching issues

  webpack(config, { isServer }) {
    if (!isServer) {
      // Fallback for 'buffer' module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer/"),
      };
    }
    return config;
  },

  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", // Limit request body size for server actions
      allowedOrigins: ["https://your-allowed-origin.com"], // Specify allowed origins
    },
  },

  // Ensure all server-rendered routes use the Edge Runtime
  runtime: "experimental-edge",
};

// Enable Cloudflare Pages development platform in dev environment
if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

export default nextConfig;
