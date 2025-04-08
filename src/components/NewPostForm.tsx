"use client"

import type React from "react"
import { useState } from "react"
import { ImageIcon, X } from "lucide-react"
import type { Post } from "../lib/types"

interface NewPostFormProps {
  onAddPost: (post: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => void
}

export default function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onAddPost({
        author: {
          id: "4",
          name: "Vous",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content,
        ...(image && { image }),
      })
      setContent("")
      setImage("")
      setIsExpanded(false)
    }
  }

  return (
    <div className="toki-new-post">
      <form onSubmit={handleSubmit}>
        <div className="toki-new-post-input">
          <div className="toki-avatar">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Your profile" />
          </div>
          <textarea
            className="toki-textarea"
            placeholder="Quoi de neuf?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={() => setIsExpanded(true)}
            rows={isExpanded ? 3 : 1}
          />
        </div>

        {isExpanded && (
          <>
            {image && (
              <div className="toki-image-preview">
                <img src="https://images.unsplash.com/photo-1682687982501-1e58ab814714" alt="Post preview" />
                <button type="button" className="toki-remove-image" onClick={() => setImage("")}>
                  <X size={16} />
                  <span className="sr-only">Remove image</span>
                </button>
              </div>
            )}

            <div className="toki-post-actions">
              <button
                type="button"
                className="toki-btn toki-btn-secondary"
                onClick={() => setImage("https://images.unsplash.com/photo-1682687982501-1e58ab814714")}
              >
                <ImageIcon size={18} className="toki-icon" />
                Ajouter une image
              </button>

              <button
                type="submit"
                className={`toki-btn toki-btn-primary ${!content.trim() ? "toki-btn-disabled" : ""}`}
                disabled={!content.trim()}
              >
                Publier
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
