import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
    },
});

export async function GET() {
    const command = new ListObjectsV2Command({
        Bucket: 'my-bucket',
        Prefix: 'albums/',
    });

    const result = await r2.send(command);

    const photos =
        result.Contents?.map((item) => ({
            key: item.Key,
        })) || [];

    return NextResponse.json({ photos });
}
