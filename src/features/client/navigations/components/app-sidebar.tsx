import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

import Link from 'next/link'
export function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton>
          <Link
            href='/'
            className='text-[17px] font-bold flex items-center gap-x-1'
          >
            <Image
              src='/logo.svg'
              alt='Zsocial'
              width={30}
              height={30}
            />
            Zsocial.com
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
    </Sidebar>
  )
}
