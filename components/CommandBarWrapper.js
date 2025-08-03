import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the CommandBar with no SSR
const CommandBar = dynamic(() => import('./CommandBar'), { ssr: false })

export default function CommandBarWrapper({ children }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Return children without CommandBar during SSR
    return children
  }

  // Return CommandBar with children on client side
  return <CommandBar>{children}</CommandBar>
}
