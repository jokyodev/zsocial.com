import { router } from '@/server/trpc'
import { createIdeaRouter } from '../features/create-idea/server/create-idea.router'

export const ideasRouter = router({
  createIdea: createIdeaRouter,
})
