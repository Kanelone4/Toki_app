"use client"

import { useState } from "react"
import { 
  Newspaper, 
  MessageSquare, 
  MessagesSquare, 
  Users, 
  Image as ImageIcon, 
  Settings,
  Download
} from "lucide-react"

const navItems = [
  { id: "feed", label: "News Feed", icon: Newspaper },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 6 },
  { id: "forums", label: "Forums", icon: MessagesSquare, badge: 3 },
  { id: "friends", label: "Friends", icon: Users, badge: 2 },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("feed")

  return (
    <aside className="hidden lg:flex flex-col w-[240px] min-h-screen bg-[var(--color-white)] border-r border-[var(--color-border)]">
      {/* Profile */}
      <div className="p-6 pb-4 flex flex-col items-center border-b border-[var(--color-border)]">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-[3px]">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Bogdan Nikitin"
              className="w-full h-full rounded-full object-cover border-[3px] border-white"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[var(--color-success)] rounded-full border-[3px] border-white" />
        </div>
        <h2 className="font-semibold text-[var(--color-text)]">Bogdan Nikitin</h2>
        <p className="text-sm text-[var(--color-text-muted)]">@nikitinteam</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-text)]"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-[15px]">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-[var(--color-primary)] text-white"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Download */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity">
          <Download size={18} />
          Download the App
        </button>
      </div>
    </aside>
  )
}
