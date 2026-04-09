import { Calendar, Lightbulb, LucideIcon } from 'lucide-react'
export interface NavItem {
  id: string
  name: string
  href: string
  icon: LucideIcon | undefined
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export type LINKS = {
  [key: string]: NavGroup
}

export const platformLinks = {
  label: 'Platform',
  items: [
    {
      id: 'create_ideas',
      name: 'Create Ideas',
      href: '/main/ideas',
      icon: Lightbulb,
    },
  ],
}
