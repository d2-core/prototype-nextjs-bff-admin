import { ReactElement, ReactNode } from 'react'

export interface ISideNav {
  title: string
  icon: ReactElement
  items: {
    title: string
    icon: ReactElement
    children: ReactNode
  }[]
}
