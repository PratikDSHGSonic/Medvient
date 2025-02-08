

/** @type {import('next/config').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tempus.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig;