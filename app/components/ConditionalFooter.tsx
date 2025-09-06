'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  const hideFooterPaths = ['/mentoria']

  if (hideFooterPaths.includes(pathname)) {
    return null
  }
  
  return <Footer />
}