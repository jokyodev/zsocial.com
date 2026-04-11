import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@clerk/nextjs/server'

// 1. Context
export const createContext = async () => {
  const { userId, sessionId } = await auth()
  return { userId, sessionId }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      userId: ctx.userId,
      sessionId: ctx.sessionId,
    },
  })
})

export const router = t.router

// Public
export const procedure = t.procedure

// Protected
export const protectedProcedure = t.procedure.use(isAuthenticated)
