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
          content: "Hi everyone, today I was on the most beautiful mountain in the world! I also want to say hi to @Silena, @Olya and @Davis!",
          images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
          ],
          likes: 6355,
          comments: [
            {
              id: "1",
              author: { id: "2", name: "Thomas Dubois", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
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
          content: "I chose a wonderful coffee today, I wanted to tell you what product they have in stock - it's a latte with coconut milk... delicious... it's really incredibly tasty!!!",
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
              author: { id: "6", name: "Marie Dupont", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
              content: "This looks great! What stack did you use?",
              timestamp: "1h",
            },
          ],
          timestamp: "5 hours ago",
        },
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddPost = (newPost: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => {
    setPosts([{ id: Date.now().toString(), ...newPost, likes: 0, comments: [], timestamp: "Just now" }, ...posts])
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)))
  }

  const handleDislike = (postId: string) => {
    setPosts(posts.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p)))
  }

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now().toString(),
                  author: { id: "4", name: "You", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
                  content: comment,
                  timestamp: "Just now",
                },
              ],
            }
          : p
      )
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-5 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 p-5 pb-24 lg:pb-5 max-w-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-[var(--color-text)]">Feeds</h1>
        <div className="flex gap-1 bg-[var(--color-white)] rounded-lg p-1 border border-[var(--color-border)]">
          {(["recents", "friends", "popular"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={post.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-[fadeIn_0.3s_ease-out_forwards] opacity-0">
            <PostCard post={post} onLike={handleLike} onDislike={handleDislike} onAddComment={handleAddComment} />
          </div>
        ))}
      </div>

      <NewPostForm onAddPost={handleAddPost} />
    </div>
  )
}
