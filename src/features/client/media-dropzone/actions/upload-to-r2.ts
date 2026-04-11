export async function uploadToR2(file: File): Promise<string> {
  const res = await fetch('/api/r2/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
    }),
  })

  const { presignedUrl, publicUrl } = await res.json()

  await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  return publicUrl
}
