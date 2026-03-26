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

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
}

const navItems: NavItem[] = [
  { id: "feed", label: "News Feed", icon: <Newspaper size={20} /> },
  { id: "messages", label: "Messages", icon: <MessageSquare size={20} />, badge: 6 },
  { id: "forums", label: "Forums", icon: <MessagesSquare size={20} />, badge: 3 },
  { id: "friends", label: "Friends", icon: <Users size={20} />, badge: 2 },
  { id: "media", label: "Media", icon: <ImageIcon size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("feed")

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen sticky top-0 bg-white/70 backdrop-blur-xl border-r border-[var(--color-border)]/50">
      {/* User Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-4">
          {/* Gradient ring around avatar */}
          <div className="w-[88px] h-[88px] rounded-full p-[3px] bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Bogdan Nikitin"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-[var(--color-success)] rounded-full border-[3px] border-white shadow-sm"></div>
        </div>
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Bogdan Nikitin</h2>
        <p className="text-sm text-[var(--color-muted)]">@nikitinteam</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  activeItem === item.id
                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span className={`transition-transform duration-200 ${activeItem !== item.id ? "group-hover:scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-[15px]">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-xs font-semibold min-w-[22px] h-[22px] flex items-center justify-center rounded-full ${
                    activeItem === item.id 
                      ? "bg-white/25 text-white" 
                      : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Download App Section */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 hover:-translate-y-0.5">
          <Download size={20} />
          <span>Download the App</span>
        </button>
      </div>
    </aside>
  )
}
