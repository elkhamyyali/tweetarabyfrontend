/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Ignore typescript errors in specific file or files
        ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    images: { unoptimized: true },
    trailingSlash: true,
    // Add fallback for dynamic routes
    experimental: {
        missingSuspenseWithCSRError: false,
    },
};

module.exports = nextConfig;