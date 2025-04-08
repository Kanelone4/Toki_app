"use client"

import { useState } from "react"
import { Heart, MessageSquare, Send } from "lucide-react"
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

  const handleLikeToggle = () => {
    if (isLiked) {
      onDislike(post.id)
    } else {
      onLike(post.id)
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

  return (
    <div className="toki-post">
      <div className="toki-post-header">
        <div className="toki-avatar">
          <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
        </div>
        <div className="toki-post-author">
          <h3 className="toki-author-name">{post.author.name}</h3>
          <p className="toki-post-time">{post.timestamp}</p>
        </div>
      </div>

      <div className="toki-post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="toki-post-image">
            <img src={post.image || "/placeholder.svg"} alt="Post content" />
          </div>
        )}
      </div>

      <div className="toki-post-actions">
        <button className={`toki-action-btn ${isLiked ? "toki-liked" : ""}`} onClick={handleLikeToggle}>
          <Heart className={`toki-icon ${isLiked ? "toki-icon-filled" : ""}`} size={18} />
          <span>{post.likes} likes</span>
        </button>

        <button className="toki-action-btn" onClick={() => setShowComments(!showComments)}>
          <MessageSquare className="toki-icon" size={18} />
          <span>{post.comments.length} commentaires</span>
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
                    <p className="toki-comment-time">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="toki-comment-form">
            <div className="toki-avatar toki-avatar-small">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Your profile" />
            </div>
            <input
              type="text"
              className="toki-comment-input"
              placeholder="Ajouter un commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              title="Envoyer"
              className={`toki-send-btn ${!comment.trim() ? "toki-btn-disabled" : ""}`}
              disabled={!comment.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}