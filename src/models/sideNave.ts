import { ReactNode } from 'react'

export interface ISideNav {
  title: string
  icon: ReactNode
  items: {
    title: string
    icon: ReactNode
    link: string
  }[]
}
