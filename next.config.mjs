/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "i.scdn.co",
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
}

export default nextConfig
