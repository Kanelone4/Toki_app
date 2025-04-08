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
          content:
            "Bonjour à tous! Je viens de terminer mon nouveau projet React. J'ai utilisé les dernières fonctionnalités de React 18 et j'ai vraiment apprécié l'expérience. Qu'en pensez-vous?",
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
              content: "C'est vraiment impressionnant! J'adore le design et la façon dont tu as structuré le code.",
              timestamp: "2h",
            },
          ],
          timestamp: "3h",
        },
        {
          id: "2",
          author: {
            id: "3",
            name: "Emma Leclerc",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          },
          content:
            "Je viens de découvrir cette nouvelle bibliothèque JavaScript pour la gestion d'état. Elle est incroyablement simple à utiliser et très performante!",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
          likes: 8,
          comments: [],
          timestamp: "5h",
        },
        {
          id: "3",
          author: {
            id: "5",
            name: "Lucas Bernard",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          },
          content: "Journée parfaite pour coder en plein air! Le soleil, un bon café et VS Code, que demander de plus?",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          likes: 23,
          comments: [
            {
              id: "3",
              author: {
                id: "6",
                name: "Marie Dupont",
                avatar: "https://randomuser.me/api/portraits/women/12.jpg",
              },
              content: "Ça a l'air génial! Quel projet travailles-tu en ce moment?",
              timestamp: "1h",
            },
            {
              id: "4",
              author: {
                id: "5",
                name: "Lucas Bernard",
                avatar: "https://randomuser.me/api/portraits/men/22.jpg",
              },
              content: "Je développe une application de gestion de tâches avec React et TypeScript!",
              timestamp: "45min",
            },
          ],
          timestamp: "6h",
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
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleDislike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: Math.max(0, post.likes - 1) } : post)))
  }

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) => {
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
              },
            ],
          }
        }
        return post
      }),
    )
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
          <h1 className="toki-title">Toki Talk</h1>
          <p className="toki-subtitle">Découvrez ce que partagent vos amis</p>
        </div>

        <NewPostForm onAddPost={handleAddPost} />

        <div className="toki-posts">
          {posts.map((post) => (
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
