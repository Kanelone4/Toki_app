"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ImageIcon, X, MapPin, Globe, Send, ChevronDown, FileIcon } from "lucide-react"
import type { Post } from "../lib/types"

interface NewPostFormProps {
  onAddPost: (post: Omit<Post, "id" | "likes" | "comments" | "timestamp">) => void
}

export default function NewPostForm({ onAddPost }: NewPostFormProps) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
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
    <div className={`bg-white rounded-3xl shadow-[var(--shadow)] p-5 mt-6 transition-all duration-200 ${
      isFocused ? "shadow-[var(--shadow-md)] ring-1 ring-[var(--color-primary)]/10" : ""
    }`}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--color-border-light)]">
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
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-[var(--color-secondary)] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all placeholder:text-[var(--color-muted)]"
            />
          </div>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mt-4 ml-15 relative rounded-2xl overflow-hidden">
            <img 
              src={image} 
              alt="Upload preview"
              className="w-full h-48 object-cover rounded-2xl"
            />
            <button 
              type="button"
              onClick={() => setImage("")}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border-light)]">
          <div className="flex items-center gap-1">
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <FileIcon size={18} className="text-[var(--color-muted)]" />
              <span className="hidden sm:inline text-[13px] font-medium">File</span>
            </button>
            <button 
              type="button"
              onClick={handleFileSelect}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <ImageIcon size={18} className="text-emerald-500" />
              <span className="hidden sm:inline text-[13px] font-medium">Image</span>
            </button>
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <MapPin size={18} className="text-rose-500" />
              <span className="hidden sm:inline text-[13px] font-medium">Location</span>
            </button>
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] transition-colors"
            >
              <Globe size={18} className="text-[var(--color-primary)]" />
              <span className="hidden sm:inline text-[13px] font-medium">Public</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              content.trim()
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-md shadow-[var(--color-primary)]/25 hover:shadow-lg"
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
