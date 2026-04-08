'use client'
import { Button } from '@/components/ui/button'
import { ScanHeart } from 'lucide-react'
export function FeebackForm() {
  return (
    <Button variant='outline'>
      <ScanHeart />
      Feedback
    </Button>
  )
}
