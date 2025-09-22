import type { NextConfig } from "next";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: `${bucketName}.s3.${region}.amazonaws.com`,
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
