import { PostProvider } from '@/context/PostContext'
import React, { ReactNode } from 'react'

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PostProvider>
      {children}
    </PostProvider>
  )
}

