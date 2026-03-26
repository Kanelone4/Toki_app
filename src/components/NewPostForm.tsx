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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onAddPost({
        author: { id: "4", name: "You", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        content,
        ...(image && { image }),
      })
      setContent("")
      setImage("")
    }
  }

  const handleImageUpload = () => {
    setImage("https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&h=400&fit=crop")
  }

  return (
    <div className="bg-[var(--color-white)] rounded-xl border border-[var(--color-border)] p-4 mt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="You" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <input
            type="text"
            placeholder="Share something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-[var(--color-bg-soft)] rounded-full px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        {image && (
          <div className="mt-3 ml-13 relative">
            <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
            <button type="button" onClick={() => setImage("")} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1">
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] text-sm">
              <FileIcon size={18} className="text-[var(--color-text-muted)]" />
              <span className="hidden sm:inline">File</span>
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] text-sm">
              <ImageIcon size={18} className="text-emerald-500" />
              <span className="hidden sm:inline">Image</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] text-sm">
              <MapPin size={18} className="text-rose-500" />
              <span className="hidden sm:inline">Location</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] text-sm">
              <Globe size={18} className="text-[var(--color-primary)]" />
              <span className="hidden sm:inline">Public</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              content.trim()
                ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                : "bg-[var(--color-bg)] text-[var(--color-text-muted)] cursor-not-allowed"
            }`}
          >
            <Send size={16} />
            Send
          </button>
        </div>

        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} aria-label="Upload image" />
      </form>
    </div>
  )
}
