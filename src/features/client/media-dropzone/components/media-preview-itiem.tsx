import { X, Play, Loader2 } from 'lucide-react'
import { MediaItem } from '../types'

interface MediaPreviewItemProps {
  item: MediaItem
  onRemove: () => void
}

export function MediaPreviewItem({
  item,
  onRemove,
}: MediaPreviewItemProps) {
  return (
    <div className='relative w-25 h-25 rounded-sm overflow-hidden group'>
      {item.type === 'video' ? (
        <>
          <video
            src={item.url}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
            <Play className='w-6 h-6 text-white' />
          </div>
        </>
      ) : (
        <img
          src={item.url}
          alt=''
          className='w-full h-full object-cover'
        />
      )}

      {item.uploading && (
        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
          <Loader2 className='w-5 h-5 text-white animate-spin' />
        </div>
      )}

      {item.error && (
        <div className='absolute inset-0 bg-destructive/60 flex items-center justify-center'>
          <p className='text-white text-xs text-center px-1'>
            Upload failed
          </p>
        </div>
      )}

      {!item.uploading && (
        <button
          onClick={onRemove}
          className='absolute top-1 right-1 bg-black/50 rounded-full p-0.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <X className='w-3 h-3 text-white' />
        </button>
      )}
    </div>
  )
}
