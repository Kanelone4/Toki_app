"use client"

import { useState } from "react"
import { 
  Menu, 
  X, 
  Newspaper, 
  MessageSquare, 
  MessagesSquare, 
  Users, 
  Image as ImageIcon, 
  Settings,
  Bell
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

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("feed")

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
            Toki Talk
          </h1>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--color-secondary)] transition-colors relative">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-accent)] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl animate-[slideIn_0.3s_ease-out]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Profile */}
            <div className="p-4 flex items-center gap-3 border-b border-[var(--color-border)]">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-primary)]/20">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Bogdan Nikitin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-foreground)]">Bogdan Nikitin</h3>
                <p className="text-sm text-[var(--color-muted)]">@nikitinteam</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-3">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeItem === item.id
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]"
                      }`}
                    >
                      {item.icon}
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
          </div>
        </>
      )}

      {/* Bottom Navigation for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] px-2 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                activeItem === item.id
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
