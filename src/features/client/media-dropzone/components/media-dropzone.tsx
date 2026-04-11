'use client'

import { useEffect, useRef } from 'react'
import { MediaItem } from '../types'
import { ACCEPTED_TYPES } from '../constants'
import { useMediaDropzone } from '../hooks'
import { MediaPreviewItem } from './media-preview-itiem'
import { MediaDropTrigger } from './media-drop-trigger'

interface MediaDropzoneProps {
  onMediaChange?: (items: MediaItem[]) => void
}

export function MediaDropzone({ onMediaChange }: MediaDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    items,
    isDragging,
    canAddMore,
    addFiles,
    remove,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useMediaDropzone({ onMediaChange })

  useEffect(() => {
    console.log('items', items)
  }, [items])

  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item, i) => (
        <MediaPreviewItem
          key={i}
          item={item}
          onRemove={() => remove(i)}
        />
      ))}

      {canAddMore && (
        <MediaDropTrigger
          count={items.length}
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        />
      )}

      <input
        ref={inputRef}
        type='file'
        accept={ACCEPTED_TYPES}
        multiple
        className='hidden'
        onChange={e => addFiles(e.target.files)}
      />
    </div>
  )
}
