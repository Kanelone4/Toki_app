"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import NewPostForm from "./NewPostForm"
import type { Post } from "../lib/types"

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"recents" | "friends" | "popular">("recents")

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: "1",
          author: {
            id: "1",
            name: "George Lobko",
            avatar: "https://randomuser.me/api/portraits/men/75.jpg",
          },
          content:
            "Hi everyone, today I was on the most beautiful mountain in the world! I also want to say hi to @Silena, @Olya and @Davis!",
          images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
          ],
          likes: 6355,
          comments: [
            {
              id: "1",
              author: {
                id: "2",
                name: "Thomas Dubois",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              content: "Wow! This is amazing! Where is this place?",
              timestamp: "2h",
            },
          ],
          timestamp: "2 hours ago",
          reactions: ["like", "love", "wow"],
        },
        {
          id: "2",
          author: {
            id: "3",
            name: "Vitaliy Boyko",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          content:
            "I chose a wonderful coffee today, I wanted to tell you what product they have in stock - it's a latte with coconut milk... delicious... it's really incredibly tasty!!!",
          likes: 6355,
          comments: [],
          timestamp: "3 hours ago",
        },
        {
          id: "3",
          author: {
            id: "5",
            name: "Sophie Martin",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          },
          content: "Just finished my new React project. Used the latest features of React 18 and really enjoyed the experience. What do you think?",
          images: ["https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop"],
          likes: 1523,
          comments: [
            {
              id: "3",
              author: {
                id: "6",
                name: "Marie Dupont",
                avatar: "https://randomuser.me/api/portraits/women/12.jpg",
              },
              content: "This looks great! What stack did you use?",
              timestamp: "1h",
            },
          ],
          timestamp: "5 hours ago",
        },
      ])
      setIsLoading(false)
    }, 600)
  }, [])

  const handleAddPost = (newPost: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      likes: 0,
      comments: [],
      timestamp: "Just now",
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
                  name: "You",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                content: comment,
                timestamp: "Just now",
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
      <div className="flex-1 max-w-[640px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
            <p className="text-sm text-[var(--color-muted)]">Loading posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-[640px] mx-auto px-4 lg:px-6 py-6 pb-24 lg:pb-6">
      {/* Header with tabs */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Feeds</h1>
        <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-[var(--shadow)]">
          {(["recents", "friends", "popular"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-white/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {posts.map((post, index) => (
          <div 
            key={post.id}
            style={{ animationDelay: `${index * 80}ms` }}
            className="animate-[fadeIn_0.4s_ease-out_forwards] opacity-0"
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onDislike={handleDislike}
              onAddComment={handleAddComment}
            />
          </div>
        ))}
      </div>

      {/* New Post Form at bottom */}
      <NewPostForm onAddPost={handleAddPost} />
    </div>
  )
}
