export type MediaSource = 'local' | 'unsplash'
export type MediaType = 'image' | 'video'

export type MediaItem = {
  url: string
  type: MediaType
  source: MediaSource
  uploading?: boolean
  error?: boolean
}
