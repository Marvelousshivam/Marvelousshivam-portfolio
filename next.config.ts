import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracing: false,
  images: {
    domains: ['i.scdn.co', 'c.saavncdn.com', 'i.ytimg.com', 'lh3.googleusercontent.com', 'yt3.ggpht.com', 'yt3.googleusercontent.com'],
  },
};

export default nextConfig;
