import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
export function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center p-8 mt-15'>
      <div className='w-100 mx-auto'>
        <Image
          src='/images/a1.png'
          alt='Empty State'
          width={566}
          height={375.21}
          priority
          quality={100}
          className='w-full h-auto object-contain'
        />
      </div>
      <div className='mt-5 text-center'>
        <h3 className='text-xl font-medium'>Your Central Idea Hub</h3>
        <p className='py-3 text-base text-muted-foreground'>
          Initiate a new concept or simply drop your media assets to
          build your flow.
        </p>
        <Button className='px-10 py-6 text-base font-medium mt-5'>
          <Plus /> New Idea
        </Button>
      </div>
    </div>
  )
}
