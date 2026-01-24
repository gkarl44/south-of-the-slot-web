import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you are deploying to a user page (username.github.io), keep basePath empty.
  // If you are deploying to a project page (username.github.io/repo-name), you might need basePath: '/repo-name'
  // However, since you have a custom domain (southoftheslot.org), we don't need a basePath.
};

export default nextConfig;
