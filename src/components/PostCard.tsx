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
  const inputRef = useRef<HTMLInputElement>(null)

  const handleLikeToggle = () => {
    if (isLiked) {
      onDislike(post.id)
    } else {
      setIsAnimating(true)
      onLike(post.id)
      setTimeout(() => setIsAnimating(false), 400)
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
    if (!showComments) setTimeout(() => inputRef.current?.focus(), 100)
  }

  const formatNumber = (num: number) => (num >= 1000 ? (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K" : num.toString())

  const renderContent = (text: string) =>
    text.split(/(@\w+)/g).map((part, i) =>
      part.startsWith("@") ? (
        <span key={i} className="text-[var(--color-primary)] font-medium cursor-pointer hover:underline">{part}</span>
      ) : (
        part
      )
    )

  return (
    <article className="bg-[var(--color-white)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} className="w-11 h-11 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-[var(--color-text)] text-[15px]">{post.author.name}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{post.timestamp}</p>
          </div>
        </div>
        <button title="More options" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-soft)] text-[var(--color-text-muted)]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-[var(--color-text)] text-[15px] leading-relaxed">{renderContent(post.content)}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className={`px-4 pb-3 grid gap-1.5 ${post.images.length === 1 ? "" : post.images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {post.images.slice(0, 3).map((img, idx) => (
            <div key={idx} className={`relative rounded-lg overflow-hidden cursor-pointer group ${post.images!.length === 1 ? "aspect-[16/10]" : "aspect-square"}`}>
              <img src={img} alt={`Post ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {idx === 2 && post.images!.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">+{post.images!.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {post.image && !post.images && (
        <div className="px-4 pb-3">
          <div className="rounded-lg overflow-hidden">
            <img src={post.image} alt="Post" className="w-full aspect-[16/10] object-cover" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-[var(--color-border)] flex items-center gap-5">
        <button onClick={handleLikeToggle} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-danger)]"}`}>
          <Heart size={20} className={`transition-transform ${isLiked ? "fill-current" : ""} ${isAnimating ? "animate-[heartPop_0.4s_ease-out]" : ""}`} />
          <span>{formatNumber(post.likes)}</span>
          <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
        </button>

        <button onClick={handleCommentClick} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Comment</span>
        </button>

        {post.reactions && post.reactions.length > 0 && (
          <div className="ml-auto flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-[var(--color-danger)] flex items-center justify-center border-2 border-white">
              <Heart size={10} className="text-white fill-white" />
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center border-2 border-white">
              <Smile size={10} className="text-white" />
            </span>
          </div>
        )}
      </div>

      {/* Comments */}
      {(showComments || post.comments.length > 0) && (
        <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-3">
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <img src={c.author.avatar || "/placeholder.svg"} alt={c.author.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="bg-[var(--color-white)] rounded-xl px-3 py-2 inline-block border border-[var(--color-border)]">
                      <p className="text-xs font-semibold text-[var(--color-text)]">{c.author.name}</p>
                      <p className="text-sm text-[var(--color-text)]">{c.content}</p>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 ml-2">{c.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="flex items-center gap-2.5">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="You" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 flex items-center bg-[var(--color-white)] rounded-full px-4 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)]">
              <input
                ref={inputRef}
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <button
                type="submit"
                title="Send"
                disabled={!comment.trim()}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${comment.trim() ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg)] text-[var(--color-text-muted)]"}`}
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
