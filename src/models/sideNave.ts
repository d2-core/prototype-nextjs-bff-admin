import { ReactNode } from 'react'

export interface SideNav {
  title: string
  icon: ReactNode
  items: {
    title: string
    icon: ReactNode
    link: string
  }[]
}
