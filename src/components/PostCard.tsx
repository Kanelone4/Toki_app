"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Heart, MessageSquare, Send, Share2, Bookmark, MoreHorizontal } from "lucide-react"
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

  return (
    <div className="toki-post">
      <div className="toki-post-header">
        <div className="toki-post-header-left">
          <div className="toki-avatar">
            <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          </div>
          <div className="toki-post-author">
            <h3 className="toki-author-name">{post.author.name}</h3>
            <p className="toki-post-time">{post.timestamp}</p>
          </div>
        </div>
        <button title="Plus" className="toki-more-btn">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="toki-post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="toki-post-image">
            <img src={post.image || "/placeholder.svg"} alt="Post content" />
          </div>
        )}
      </div>

      <div className="toki-post-stats">
        <div className="toki-post-likes">
          <div className="toki-like-icon-bg">
            <Heart size={12} fill="#fff" stroke="none" />
          </div>
          <span>{post.likes}</span>
        </div>
        <div className="toki-post-comments-count">
          <span>{post.comments.length} commentaires</span>
        </div>
      </div>

      <div className="toki-post-actions">
        <button className={`toki-action-btn ${isLiked ? "toki-liked" : ""}`} onClick={handleLikeToggle}>
          <Heart
            className={`toki-icon ${isLiked ? "toki-icon-filled" : ""} ${isAnimating ? "toki-heart-animation" : ""}`}
            size={20}
          />
          <span>Like</span>
        </button>

        <button className="toki-action-btn" onClick={handleCommentClick}>
          <MessageSquare className="toki-icon" size={20} />
          <span>Commenter</span>
        </button>

        <button className="toki-action-btn">
          <Share2 className="toki-icon" size={20} />
          <span>Share</span>
        </button>

        <button title="Enregistrer" className="toki-action-btn toki-action-save">
          <Bookmark className="toki-icon" size={20} />
        </button>
      </div>

      {(showComments || post.comments.length > 0) && (
        <div className="toki-comments">
          {post.comments.length > 0 && (
            <div className="toki-comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="toki-comment">
                  <div className="toki-avatar toki-avatar-small">
                    <img src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  </div>
                  <div className="toki-comment-bubble">
                    <p className="toki-comment-author">{comment.author.name}</p>
                    <p className="toki-comment-text">{comment.content}</p>
                    <div className="toki-comment-actions">
                      <span className="toki-comment-time">{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="toki-comment-form">
            <div className="toki-avatar toki-avatar-small">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Your profile" />
            </div>
            <div className="toki-comment-input-wrapper">
              <input
                ref={commentInputRef}
                type="text"
                className="toki-comment-input"
                placeholder="Écrire un commentaire..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                title="Envoyer"
                className={`toki-send-btn ${!comment.trim() ? "toki-btn-disabled" : ""}`}
                disabled={!comment.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
