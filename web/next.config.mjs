/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.loricloud.cn',
            port: '',
            pathname: '/**',
        }]
    },
};

export default nextConfig;