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
import { useState } from 'react'
import { MediaDropzone } from '@/features/client/media-dropzone'
import { MediaItem } from '@/features/client/media-dropzone/types'
import { Controller, useForm } from 'react-hook-form'
import { IdeaInputType, ideaSchema } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldLabel } from '@/components/ui/field'
export function CreateIdeaModal() {
  const form = useForm<IdeaInputType>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onMediaChange = (items: MediaItem[]) => {
    // console.log('Du lieu moi ne', items)
    const completedItems = items
      .filter(i => !i.uploading && !i.error)
      .map(i => ({
        url: i.url,
        source: i.source,
        type: i.type,
      }))

    if (completedItems.length > 0) {
      localStorage.setItem(
        'zsocial_pending_media',
        JSON.stringify(completedItems)
      )
    } else {
      localStorage.removeItem('zsocial_pending_media')
    }
  }

  const onSubmit = (e: any) => {
    const { title, content } = form.getValues()
    const medias: MediaItem[] = JSON.parse(
      localStorage.getItem('zsocial_pending_media') || '[]'
    )
    console.log(medias)
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name='title'
              control={form.control}
              render={({ field }) => {
                return (
                  <Field>
                    <Input
                      {...field}
                      className='border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:font-bold text-2xl!'
                      placeholder='Give your idea title'
                    />
                  </Field>
                )
              }}
            />
            <Controller
              name='content'
              control={form.control}
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    className='w-full h-70! border-none outline-none resize-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none mt-5'
                    placeholder='Write your idea here...'
                  />
                )
              }}
            />
          </form>
        </div>
        <MediaDropzone onMediaChange={onMediaChange} />
        <Separator />
        <DialogFooter className=''>
          <Button variant='outline'>Create Post</Button>
          <Button onClick={onSubmit}>Save Idea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
