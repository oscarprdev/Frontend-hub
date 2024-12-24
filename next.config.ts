import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
