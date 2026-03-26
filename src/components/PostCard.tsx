"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Heart, MessageCircle, Send, MoreHorizontal, Smile } from "lucide-react"
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

  // Parse content for mentions
  const renderContent = (text: string) => {
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span key={index} className="text-[var(--color-primary)] font-medium cursor-pointer hover:underline">
            {part}
          </span>
        )
      }
      return part
    })
  }

  return (
    <article className="bg-white rounded-3xl shadow-[var(--shadow)] overflow-hidden hover:shadow-[var(--shadow-md)] transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-border-light)]">
            <img 
              src={post.author.avatar || "/placeholder.svg"} 
              alt={post.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-foreground)] text-[15px]">{post.author.name}</h3>
            <p className="text-xs text-[var(--color-muted)]">{post.timestamp}</p>
          </div>
        </div>
        <button 
          title="More options"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-secondary)] text-[var(--color-muted)] transition-colors"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-5 pb-4">
        <p className="text-[var(--color-foreground)] leading-relaxed text-[15px]">
          {renderContent(post.content)}
        </p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`px-5 pb-4 grid gap-2 ${
          post.images.length === 1 ? "grid-cols-1" : 
          post.images.length === 2 ? "grid-cols-2" : 
          "grid-cols-3"
        }`}>
          {post.images.slice(0, 3).map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                post.images!.length === 1 ? "aspect-[16/10]" : "aspect-square"
              }`}
            >
              <img 
                src={img} 
                alt={`Post image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {idx === 2 && post.images!.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-xl font-bold">+{post.images!.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Legacy single image support */}
      {post.image && !post.images && (
        <div className="px-5 pb-4">
          <div className="rounded-2xl overflow-hidden cursor-pointer group">
            <img 
              src={post.image} 
              alt="Post content"
              className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* Post Stats & Actions */}
      <div className="px-5 py-4 border-t border-[var(--color-border-light)] flex items-center gap-6">
        {/* Like */}
        <button 
          onClick={handleLikeToggle}
          className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
            isLiked 
              ? "text-[var(--color-like)]" 
              : "text-[var(--color-muted-foreground)] hover:text-[var(--color-like)]"
          }`}
        >
          <span className="relative">
            <Heart 
              size={20} 
              className={`transition-all duration-200 ${isLiked ? "fill-current scale-110" : ""} ${
                isAnimating ? "animate-[heartBeat_0.8s_ease-in-out]" : ""
              }`}
            />
          </span>
          <span className="font-semibold">{formatNumber(post.likes)}</span>
          <span className={`hidden sm:inline ${isLiked ? "text-[var(--color-like)]" : ""}`}>
            {isLiked ? "Liked" : "Like"}
          </span>
        </button>

        {/* Comment */}
        <button 
          onClick={handleCommentClick}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Comment</span>
        </button>

        {/* Reactions Preview */}
        {post.reactions && post.reactions.length > 0 && (
          <div className="ml-auto flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs shadow-sm border-2 border-white">
                <Heart size={12} className="text-white fill-white" />
              </span>
              <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs shadow-sm border-2 border-white">
                <Smile size={12} className="text-white" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {(showComments || post.comments.length > 0) && (
        <div className="px-5 py-4 border-t border-[var(--color-border-light)] bg-[var(--color-secondary)]/30">
          {/* Comments List */}
          {post.comments.length > 0 && (
            <div className="space-y-4 mb-4 max-h-72 overflow-y-auto">
              {post.comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="flex gap-3 animate-[fadeIn_0.3s_ease-out]"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.author.avatar || "/placeholder.svg"} 
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl px-4 py-3 inline-block shadow-sm">
                      <p className="text-xs font-semibold text-[var(--color-foreground)] mb-0.5">
                        {comment.author.name}
                      </p>
                      <p className="text-sm text-[var(--color-foreground)]">{comment.content}</p>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mt-1.5 ml-3">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Input */}
          <form onSubmit={handleSubmitComment} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2.5 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/10 transition-all">
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
                title="Send comment"
                disabled={!comment.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  comment.trim() 
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]" 
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
