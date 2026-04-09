import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import prisma from '@/lib/db'

import { UserRole } from '@/generated/prisma/client'

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SIGNING_SECRET to .env')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', { status: 400 })
  }

  const { type, data } = evt

  switch (type) {
    case 'user.created':
    case 'user.updated': {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        public_metadata,
      } = data

      const email = email_addresses[0]?.email_address ?? ''
      const firstName = first_name ?? ''
      const lastName = last_name ?? ''

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName,
          lastName,
          imageUrl: image_url,
        },
        create: {
          clerkId: id,
          email,
          firstName,
          lastName,
          imageUrl: image_url,
          role: UserRole.USER,
        },
      })
      break
    }

    case 'user.deleted': {
      const { id } = data
      if (id) {
        await prisma.user
          .delete({ where: { clerkId: id } })
          .catch(e => console.error('Lỗi xóa user:', e))
      }
      break
    }

    default:
      console.log(`Webhook type ${type} chưa được xử lý.`)
  }

  return new Response('Webhook received', { status: 200 })
}
