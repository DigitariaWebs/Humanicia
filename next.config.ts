import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow specific external origins to access dev assets (e.g., /_next/*) during development
  // This prevents cross-origin warnings when testing from other devices on your LAN.
  allowedDevOrigins: [
    "http://192.168.1.7:3000",
    "http://192.168.56.1:3000",
    "http://localhost:3000",
  ],
  
  // Disable source maps in development to prevent 404 errors
  productionBrowserSourceMaps: false,
  
  // Experimental features for better development
  experimental: {
    // Enable better error handling
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
