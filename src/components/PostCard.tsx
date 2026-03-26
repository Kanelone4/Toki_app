"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Heart, MessageSquare, Send, MoreHorizontal } from "lucide-react"
import type { Post } from "../lib/types"

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onDislike: (postId: string) => void
  onAddComment: (postId: string, comment: string) => void
}

export default function PostCard({ post, onLike, onDislike, onAddComment }: PostCardProps) {
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  const handleLikeToggle = () => {
    if (isLiked) {
      onDislike(post.id)
    } else {
      setIsAnimating(true)
      onLike(post.id)
      setTimeout(() => setIsAnimating(false), 800)
    }
    setIsLiked(!isLiked)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddComment(post.id, comment)
      setComment("")
      setShowComments(true)
    }
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
    if (!showComments) {
      setTimeout(() => {
        commentInputRef.current?.focus()
      }, 100)
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K"
    }
    return num.toString()
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[var(--color-primary)]/10">
            <img 
              src={post.author.avatar || "/placeholder.svg"} 
              alt={post.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-foreground)]">{post.author.name}</h3>
            <p className="text-xs text-[var(--color-muted)]">{post.timestamp}</p>
          </div>
        </div>
        <button 
          title="More options"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-secondary)] text-[var(--color-muted)] transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-[var(--color-foreground)] leading-relaxed">{post.content}</p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-1 px-4 pb-3 ${
          post.images.length === 1 ? "grid-cols-1" : 
          post.images.length === 2 ? "grid-cols-2" : 
          "grid-cols-3"
        }`}>
          {post.images.slice(0, 3).map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-xl overflow-hidden ${
                post.images!.length === 1 ? "aspect-video" : "aspect-square"
              }`}
            >
              <img 
                src={img} 
                alt={`Post image ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {idx === 2 && post.images!.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">+{post.images!.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Legacy single image support */}
      {post.image && !post.images && (
        <div className="px-4 pb-3">
          <div className="rounded-xl overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content"
              className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      )}

      {/* Post Stats & Actions */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like */}
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              isLiked ? "text-[var(--color-like)]" : "text-[var(--color-muted-foreground)] hover:text-[var(--color-like)]"
            }`}
          >
            <Heart 
              size={18} 
              className={`${isLiked ? "fill-current" : ""} ${isAnimating ? "animate-[heartBeat_0.8s_ease-in-out]" : ""}`}
            />
            <span>{formatNumber(post.likes)}</span>
          </button>

          {/* Comment */}
          <button 
            onClick={handleCommentClick}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
          >
            <MessageSquare size={18} />
            <span>Comment</span>
          </button>
        </div>

        {/* Reactions Preview */}
        {post.reactions && (
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px]">
                <Heart size={10} className="text-white fill-white" />
              </span>
              <span className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-[10px]">
                <span>W</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {(showComments || post.comments.length > 0) && (
        <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-secondary)]/30">
          {/* Comments List */}
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
              {post.comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="flex gap-2 animate-[fadeIn_0.3s_ease-out]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.author.avatar || "/placeholder.svg"} 
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl px-3 py-2 inline-block">
                      <p className="text-xs font-semibold text-[var(--color-foreground)]">{comment.author.name}</p>
                      <p className="text-sm text-[var(--color-foreground)]">{comment.content}</p>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mt-1 ml-2">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex items-center bg-white rounded-full px-3 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors">
              <input
                ref={commentInputRef}
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted)]"
              />
              <button
                type="submit"
                title="Send"
                disabled={!comment.trim()}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  comment.trim() 
                    ? "bg-[var(--color-primary)] text-white" 
                    : "bg-[var(--color-secondary)] text-[var(--color-muted)]"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  )
}
