import { router } from '../trpc'
import { ideasRouter } from '@/features/client/ideas/server/ideas.router'

export const appRouter = router({
  ideas: ideasRouter,
})

export type AppRouter = typeof appRouter
