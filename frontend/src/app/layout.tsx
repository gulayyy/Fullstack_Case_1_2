import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Case 1_2 Full Stack',
  description: 'Full Stack Product Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
