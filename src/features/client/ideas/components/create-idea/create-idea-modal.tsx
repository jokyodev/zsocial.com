'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { MediaDropzone } from '@/features/client/media-dropzone'

export function CreateIdeaModal() {
  const [content, setContent] = useState<string>('')

  const handleContentChange = (e: any) => {
    const text = e.target.value
    setContent(text)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New Idea
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full sm:max-w-175 '>
        <DialogHeader>
          <DialogTitle>Create Idea</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            className='border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:font-bold text-2xl!'
            placeholder='Give your idea title'
          />
          <Textarea
            className='w-full h-70! border-none outline-none resize-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none mt-5'
            placeholder='Write your idea here...'
            onChange={e => handleContentChange(e)}
          />
        </div>
        <MediaDropzone />
        <Separator />
        <DialogFooter className=''>
          <Button variant='outline'>Create Post</Button>
          <Button>Save Idea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
