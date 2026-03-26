"use client"

import { useState } from "react"
import { Menu, X, Newspaper, MessageSquare, MessagesSquare, Users, Image as ImageIcon, Settings, Bell, Home } from "lucide-react"

const navItems = [
  { id: "feed", label: "News Feed", icon: Newspaper },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 6 },
  { id: "forums", label: "Forums", icon: MessagesSquare, badge: 3 },
  { id: "friends", label: "Friends", icon: Users, badge: 2 },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "settings", label: "Settings", icon: Settings },
]

const bottomNavItems = [
  { id: "feed", label: "Home", icon: Home },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 6 },
  { id: "forums", label: "Forums", icon: MessagesSquare },
  { id: "friends", label: "Friends", icon: Users },
  { id: "media", label: "Media", icon: ImageIcon },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("feed")

  return (
    <>
      {/* Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-[var(--color-white)] border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--color-bg-soft)]">
            <Menu size={22} className="text-[var(--color-text)]" />
          </button>
          <h1 className="text-lg font-bold text-[var(--color-primary)]">Toki Talk</h1>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--color-bg-soft)] relative">
            <Bell size={22} className="text-[var(--color-text)]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-accent)] rounded-full" />
          </button>
        </div>
      </header>

      {/* Drawer */}
      {isOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setIsOpen(false)} />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] bg-[var(--color-white)] shadow-xl animate-[slideInLeft_0.2s_ease-out]">
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="font-bold text-[var(--color-text)]">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-bg-soft)]">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 flex items-center gap-3 border-b border-[var(--color-border)]">
              <div className="relative">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Bogdan Nikitin" className="w-12 h-12 rounded-full" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[var(--color-success)] rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text)]">Bogdan Nikitin</h3>
                <p className="text-sm text-[var(--color-text-muted)]">@nikitinteam</p>
              </div>
            </div>

            <nav className="p-3">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { setActiveItem(item.id); setIsOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)]"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-[var(--color-primary)] text-white"}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-white)] border-t border-[var(--color-border)] px-2 py-1.5">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"}`}
              >
                <div className="relative">
                  <Icon size={22} />
                  {item.badge && <span className="absolute -top-1 -right-1 min-w-[16px] h-4 text-[10px] font-bold bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center">{item.badge}</span>}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
