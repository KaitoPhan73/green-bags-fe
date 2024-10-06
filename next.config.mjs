/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        pathname: "*/**",
      },
    ],
  },
};

export default nextConfig;
