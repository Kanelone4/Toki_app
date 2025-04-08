"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import NewPostForm from "./NewPostForm"
import type { Post } from "../lib/types"
import "../styles/social.css"

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: "1",
          author: {
            id: "1",
            name: "Sophie Martin",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          },
          content: "Bonjour à tous! Je viens de terminer mon nouveau projet React.",
          image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
          likes: 15,
          comments: [
            {
              id: "1",
              author: {
                id: "2",
                name: "Thomas Dubois",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              content: "C'est vraiment impressionnant!",
              timestamp: "2h ago",
            },
          ],
          timestamp: "3h ago",
        },
        {
          id: "2",
          author: {
            id: "3",
            name: "Emma Leclerc",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          },
          content: "Je viens de découvrir cette nouvelle bibliothèque JavaScript!",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
          likes: 8,
          comments: [],
          timestamp: "5h ago",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleAddPost = (newPost: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      likes: 0,
      comments: [],
      timestamp: "À l'instant",
    }
    setPosts([post, ...posts])
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleDislike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: Math.max(0, post.likes - 1) } : post
    ))
  }

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              author: {
                id: "4",
                name: "Vous",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              content: comment,
              timestamp: "À l'instant",
            }
          ]
        }
      }
      return post
    }))
  }

  if (isLoading) {
    return (
      <div className="toki-loading">
        <div className="toki-spinner"></div>
      </div>
    )
  }

  return (
    <div className="toki-container">
      <div className="toki-content">
        <div className="toki-header">
          <h1 className="toki-title">Fil d'actualités</h1>
          <p className="toki-subtitle">Découvrez ce que partagent vos amis</p>
        </div>

        <NewPostForm onAddPost={handleAddPost} />

        <div className="toki-posts">
          {posts.map(post => (
            <PostCard 
              key={post.id}
              post={post}
              onLike={handleLike}
              onDislike={handleDislike}
              onAddComment={handleAddComment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}