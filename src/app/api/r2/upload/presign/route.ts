// app/api/upload/presign/route.ts

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { auth } from '@clerk/nextjs/server'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
})

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/quicktime', // .mov
]

export async function POST(req: Request) {
  const user = await auth()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { filename, contentType } = await req.json()

  if (!ALLOWED_TYPES.includes(contentType)) {
    return new Response(
      'Invalid file type. Only PNG, JPG, WEBP images and MP4, WEBM, MOV videos are allowed.',
      { status: 400 }
    )
  }

  const key = `uploads/${Date.now()}-${filename}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    ContentType: contentType,
  })

  const presignedUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
  })

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`

  return Response.json({ presignedUrl, publicUrl })
}
