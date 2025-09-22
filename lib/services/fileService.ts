import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
	MAX_FILE_SIZE,
	ALLOWED_IMAGE_EXTENSIONS,
} from "@/lib/constants/constants";

const s3 = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

type FileLike = {
	arrayBuffer: () => Promise<ArrayBuffer>;
	name: string;
	type: string;
	size: number;
};

export async function uploadFileToS3(file: FileLike): Promise<string> {
	try {
		if (file.size > MAX_FILE_SIZE) {
			throw new Error(
				`File is too large. Max size: ${Math.round(
					MAX_FILE_SIZE / 1024
				)} KB.`
			);
		}
		const originalName = file.name || "file.jpg";
		const extension = originalName.includes(".")
			? originalName.split(".").pop()!.toLowerCase()
			: "jpg";

		if (!ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
			throw new Error(
				`Invalid file type. Allowed types: ${ALLOWED_IMAGE_EXTENSIONS.join(
					", "
				)}`
			);
		}
		const fileName = `${Date.now()}_${originalName.replace(/\s+/g, "_")}`;

		const buffer = Buffer.from(await file.arrayBuffer());
		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME!,
			Key: fileName,
			Body: buffer,
			ContentType: file.type || `image/${extension}`,
		});
		await s3.send(command);
		return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
	} catch (error) {
		console.error("Failed to upload file to S3:", error);
		throw error;
	}
}

export async function deleteS3Object(bucket: string, key: string) {
	try {
		await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
	} catch (error) {
		console.error(error);
	}
}

export function getS3KeyFromUrl(url: string): string | null {
	if (!url || url.startsWith("/images/default.jpg")) {
		return null;
	}
	try {
		const u = new URL(url);
		const key = u.pathname.startsWith("/")
			? u.pathname.slice(1)
			: u.pathname;
		return key || null;
	} catch (err) {
		console.error("Invalid key for getS3KeyFromUrl:", url, err);
		return null;
	}
}
