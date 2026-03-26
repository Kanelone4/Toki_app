"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ImageIcon, X, MapPin, Globe, Send, ChevronDown } from "lucide-react"
import type { Post } from "../lib/types"

interface NewPostFormProps {
  onAddPost: (post: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => void
}

export default function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onAddPost({
        author: {
          id: "4",
          name: "You",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content,
        ...(image && { image }),
      })
      setContent("")
      setImage("")
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = () => {
    setImage("https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&h=400&fit=crop")
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Your profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Share something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[var(--color-secondary)] rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all placeholder:text-[var(--color-muted)]"
            />
          </div>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mt-3 ml-13 relative rounded-xl overflow-hidden">
            <img 
              src={image} 
              alt="Upload preview"
              className="w-full h-48 object-cover rounded-xl"
            />
            <button 
              type="button"
              onClick={() => setImage("")}
              className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1">
            <button 
              type="button"
              onClick={handleFileSelect}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <ImageIcon size={18} className="text-green-500" />
              <span className="hidden sm:inline">Image</span>
            </button>
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <MapPin size={18} className="text-red-500" />
              <span className="hidden sm:inline">Location</span>
            </button>
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <Globe size={18} className="text-blue-500" />
              <span className="hidden sm:inline">Public</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              content.trim()
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90"
                : "bg-[var(--color-secondary)] text-[var(--color-muted)] cursor-not-allowed"
            }`}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>

        <input
          aria-label="Upload image"
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </form>
    </div>
  )
}
