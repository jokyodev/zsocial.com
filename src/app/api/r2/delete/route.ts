// app/api/upload/delete/route.ts

import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
})

export async function DELETE(req: Request) {
  const { key } = await req.json()

  if (!key) {
    return new Response('Missing key', { status: 400 })
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
  })

  await s3.send(command)

  return Response.json({ success: true })
}
