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
  Bell,
  Home
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

const bottomNavItems = [
  { id: "feed", label: "Home", icon: <Home size={22} /> },
  { id: "messages", label: "Messages", icon: <MessageSquare size={22} />, badge: 6 },
  { id: "forums", label: "Forums", icon: <MessagesSquare size={22} />, badge: 3 },
  { id: "friends", label: "Friends", icon: <Users size={22} />, badge: 2 },
  { id: "media", label: "Media", icon: <ImageIcon size={22} /> },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("feed")

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
          >
            <Menu size={22} className="text-[var(--color-foreground)]" />
          </button>
          
          <h1 className="text-xl font-bold text-gradient">
            Toki Talk
          </h1>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--color-secondary)] transition-colors relative">
            <Bell size={22} className="text-[var(--color-foreground)]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--color-accent)] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl animate-[slideIn_0.25s_ease-out]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--color-foreground)]">Menu</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--color-secondary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Profile */}
            <div className="p-5 flex items-center gap-4 border-b border-[var(--color-border)]">
              <div className="relative">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Bogdan Nikitin"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[var(--color-success)] rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-foreground)]">Bogdan Nikitin</h3>
                <p className="text-sm text-[var(--color-muted)]">@nikitinteam</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id)
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                        activeItem === item.id
                          ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                          : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)]"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
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
          </div>
        </>
      )}

      {/* Bottom Navigation for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-[var(--color-border)]/50 px-2 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeItem === item.id
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-colors ${
                activeItem === item.id ? "bg-[var(--color-primary)]/10" : ""
              }`}>
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[10px] font-bold bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${
                activeItem === item.id ? "text-[var(--color-primary)]" : ""
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
