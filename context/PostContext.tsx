"use client"

import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react"

// type Themes = "dark" | "light"

interface PostContextType {
  post: never;
  setPost: Dispatch<SetStateAction<never>>
}

export const PostContext = createContext<PostContextType | null>(null)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState([])

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error("usePost must be used within a PostProvider")
  }
  return context
}