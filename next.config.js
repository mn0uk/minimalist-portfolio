/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/posts/:slug',
        destination: '/posts/[slug]'
      }
    ]
  }
}

module.exports = nextConfig
