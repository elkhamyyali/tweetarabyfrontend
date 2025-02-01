/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Ignore typescript errors in specific file or files
        ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
};

module.exports = nextConfig;