import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { FeebackForm } from '@/features/client/feeback/components'
import { Notification } from '@/features/client/notification/components'
import { Loader2 } from 'lucide-react'

export function AppNavbar() {
  return (
    <div className='w-full h-14 border border-l-0 flex items-center justify-between pr-5'>
      <div className='flex items-center'>
        <SidebarTrigger />
        Home
      </div>
      <div className='flex items-center gap-x-1'>
        <FeebackForm />
        <Notification />
        <ModeToggle />
        <ClerkLoading>
          <div className='h-8 w-8 rounded-full bg-muted border border-border animate-pulse flex items-center justify-center'>
            <div className='h-4 w-4 rounded-full bg-muted-foreground/20' />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  )
}
