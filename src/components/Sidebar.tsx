"use client"

import { useState } from "react"
import { 
  Newspaper, 
  MessageSquare, 
  MessagesSquare, 
  Users, 
  Image as ImageIcon, 
  Settings,
  Download,
  ChevronDown
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
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white/80 backdrop-blur-sm border-r border-[var(--color-border)]">
      {/* User Profile Section */}
      <div className="p-6 flex flex-col items-center border-b border-[var(--color-border)]">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[var(--color-primary)]/20">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Bogdan Nikitin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[var(--color-success)] rounded-full border-3 border-white"></div>
        </div>
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Bogdan Nikitin</h2>
        <p className="text-sm text-[var(--color-muted)]">@nikitinteam</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span className={activeItem === item.id ? "text-white" : ""}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                    activeItem === item.id 
                      ? "bg-white/20 text-white" 
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
      <div className="p-4 border-t border-[var(--color-border)]">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity">
          <Download size={20} />
          <span>Download the App</span>
        </button>
      </div>
    </aside>
  )
}
