"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ImageIcon, X, Smile, MapPin, Tag, Calendar } from "lucide-react"
import type { Post } from "../lib/types"

interface NewPostFormProps {
  onAddPost: (post: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => void
}

export default function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = () => {
    // Simuler un téléchargement d'image
    setImage("https://images.unsplash.com/photo-1682687982501-1e58ab814714")
  }

  return (
    <div className="toki-new-post">
      <div className="toki-new-post-header">
        <h3>Créer une publication</h3>
      </div>
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
                <img src={image || "/placeholder.svg"} alt="Post preview" />
                <button type="button" className="toki-remove-image" onClick={() => setImage("")}>
                  <X size={16} />
                  <span className="sr-only">Remove image</span>
                </button>
              </div>
            )}

            <div className="toki-post-tools">
              <p>Ajouter à votre publication</p>
              <div className="toki-post-tools-buttons">
                <button title="Ajouter une image" type="button" className="toki-tool-btn toki-tool-image" onClick={handleFileSelect}>
                  <ImageIcon size={20} />
                </button>
                <button title="Ajouter une image" type="button" className="toki-tool-btn toki-tool-tag">
                  <Tag size={20} />
                </button>
                <button title="Ajouter une image" type="button" className="toki-tool-btn toki-tool-location">
                  <MapPin size={20} />
                </button>
                <button title="Ajouter une image" type="button" className="toki-tool-btn toki-tool-emoji">
                  <Smile size={20} />
                </button>
                <button title="Ajouter une image" type="button" className="toki-tool-btn toki-tool-calendar">
                  <Calendar size={20} />
                </button>
              </div>
            </div>

            <input
             aria-label="Ajouter une image"
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />

            <button
              type="submit"
              className={`toki-btn toki-btn-primary toki-btn-publish ${!content.trim() ? "toki-btn-disabled" : ""}`}
              disabled={!content.trim()}
            >
              Publier
            </button>
          </>
        )}
      </form>
    </div>
  )
}
