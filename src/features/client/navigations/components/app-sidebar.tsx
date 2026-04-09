'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

import Link from 'next/link'
import { NavGroup, NavItem, platformLinks } from '../constants'

interface AppSidebarGroupProps {
  label: string
  items: NavItem[]
}
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
      <SidebarContent>
        <AppSidebarGroup {...platformLinks} />
      </SidebarContent>
    </Sidebar>
  )
}

const AppSidebarGroup = ({ label, items }: AppSidebarGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-xs '>
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className='flex items-center gap-2'
                >
                  {/* Nếu ông có truyền Lucide Icon vào thì render ở đây */}
                  {item.icon && <item.icon className='w-4 h-4' />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
