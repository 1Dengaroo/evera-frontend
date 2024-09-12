import { ReactNode } from 'react'

export interface SectionProps {
  title?: string
  children: ReactNode
  className?: string
  id?: string
  backgroundImage?: string
  titleClassName?: string
  descriptionClassName?: string
  shortHeight?: boolean
}
