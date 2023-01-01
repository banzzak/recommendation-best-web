/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 300000,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
