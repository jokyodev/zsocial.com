import { ModeToggle } from '@/components/mode-toggle'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  AppNavbar,
  AppSidebar,
} from '@/features/client/navigations/components'
import { ReactNode } from 'react'

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full h-full flex flex-col'>
          <div className='flex-1 flex flex-col border m-2 rounded-lg'>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
