'use client'

import { useAuthInit } from '@/hooks/useAuthInit'

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  useAuthInit()
  return <>{children}</>
}
