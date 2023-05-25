/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
