'use client'

import { useState } from 'react'
import { MediaItem } from '../types'
import { MAX_FILES } from '../constants'
import { r2 } from '@/lib/r2'
import { uploadToR2 } from '../actions/upload-to-r2'
import { getKeyFromUrl } from '../utils'

import { toast } from 'sonner'

interface UseMediaDropzoneProps {
  onMediaChange?: (items: MediaItem[]) => void
}

export function useMediaDropzone({
  onMediaChange,
}: UseMediaDropzoneProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const notifyChange = (next: MediaItem[]) => {
    onMediaChange?.(next.filter(i => !i.uploading && !i.error))
  }

  const addFiles = async (files: FileList | null) => {
    if (!files) return
    const remaining = MAX_FILES - items.length
    if (remaining <= 0) return

    const validFiles = Array.from(files)
      .slice(0, remaining)
      .filter(
        f =>
          f.type.startsWith('image/') || f.type.startsWith('video/')
      )

    const placeholders: MediaItem[] = validFiles.map(f => ({
      url: URL.createObjectURL(f),
      type: f.type.startsWith('video/') ? 'video' : 'image',
      source: 'local',
      uploading: true,
    }))

    const baseIndex = items.length
    setItems(prev => [...prev, ...placeholders])

    await Promise.all(
      validFiles.map(async (file, i) => {
        const index = baseIndex + i
        try {
          // const url = 'upload...'
          const url = await uploadToR2(file)
          setItems(prev => {
            const updated = [...prev]
            updated[index] = {
              ...updated[index],
              url,
              uploading: false,
            }
            notifyChange(updated)
            return updated
          })
        } catch {
          setItems(prev => {
            const updated = [...prev]
            updated[index] = {
              ...updated[index],
              uploading: false,
              error: true,
            }
            return updated
          })
        }
      })
    )
  }

  const addFromUnsplash = (url: string) => {
    if (items.length >= MAX_FILES) return
    const next = [
      ...items,
      { url, type: 'image' as const, source: 'unsplash' as const },
    ]
    setItems(next)
    notifyChange(next)
  }

  const remove = async (index: number) => {
    const next = items.filter((_, i) => i !== index)
    setItems(next)
    notifyChange(next)

    // call server action to remove file
    const fileKey = decodeURIComponent(
      getKeyFromUrl(items[index].url)
    )

    try {
      await fetch('/api/r2/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          key: fileKey,
        }),
      })
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra , vui lòng thử  lại sau')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return {
    items,
    isDragging,
    canAddMore: items.length < MAX_FILES,
    addFiles,
    addFromUnsplash,
    remove,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
