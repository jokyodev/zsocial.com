import { ImagePlus } from 'lucide-react'
import { MAX_FILES } from '../constants'

interface MediaDropTriggerProps {
  count: number
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onClick: () => void
}

export function MediaDropTrigger({
  count,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
}: MediaDropTriggerProps) {
  return (
    <div
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`w-35 h-35 border flex flex-col items-center justify-center rounded-sm border-dashed cursor-pointer transition-colors ${
        isDragging ? 'border-primary bg-muted' : 'border-border'
      }`}
    >
      <ImagePlus className='text-muted-foreground w-5 h-5' />
      <p className='text-center text-xs mt-2 text-muted-foreground'>
        Drag & Drop <br />
        or select a file
      </p>
      <span className='text-xs text-muted-foreground/60 mt-1'>
        {count}/{MAX_FILES}
      </span>
    </div>
  )
}
