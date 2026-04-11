import { z } from 'zod'
export const ideaSchema = z.object({
  title: z.string(),
  content: z.string(),
})

export type IdeaInputType = z.infer<typeof ideaSchema>
