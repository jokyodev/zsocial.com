import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { FeebackForm } from '@/features/client/feeback/components'
import { Notification } from '@/features/client/notification/components'

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
        <UserButton />
      </div>
    </div>
  )
}
