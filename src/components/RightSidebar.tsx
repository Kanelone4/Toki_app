"use client"

import { ChevronRight, X, Music, Utensils, Compass } from "lucide-react"

interface Story {
  id: string
  name: string
  avatar: string
  hasNew: boolean
}

interface Suggestion {
  id: string
  name: string
  avatar: string
  mutualFriends?: number
}

interface Recommendation {
  id: string
  label: string
  icon: React.ReactNode
  color: string
}

const stories: Story[] = [
  { id: "1", name: "Anatoly P.", avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop", hasNew: true },
  { id: "2", name: "Lolita Earns", avatar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop", hasNew: true },
]

const suggestions: Suggestion[] = [
  { id: "1", name: "Nick Shelburne", avatar: "https://randomuser.me/api/portraits/men/42.jpg", mutualFriends: 12 },
  { id: "2", name: "Brittni Lando", avatar: "https://randomuser.me/api/portraits/women/28.jpg", mutualFriends: 8 },
  { id: "3", name: "Ivan Shevchenko", avatar: "https://randomuser.me/api/portraits/men/56.jpg", mutualFriends: 5 },
]

const recommendations: Recommendation[] = [
  { id: "1", label: "UI/UX", icon: <X size={18} />, color: "bg-slate-100 text-slate-600" },
  { id: "2", label: "Music", icon: <Music size={18} />, color: "bg-pink-100 text-pink-600" },
  { id: "3", label: "Cooking", icon: <Utensils size={18} />, color: "bg-orange-100 text-orange-600" },
  { id: "4", label: "Hiking", icon: <Compass size={18} />, color: "bg-purple-100 text-purple-600" },
]

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 h-screen sticky top-0 overflow-y-auto py-6 px-4">
      {/* Stories Section */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Stories</h3>
        <div className="flex gap-3">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className={`w-16 h-20 rounded-xl overflow-hidden relative ${story.hasNew ? "ring-2 ring-[var(--color-primary)] ring-offset-2" : ""}`}>
                <img 
                  src={story.avatar} 
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <p className="mt-2 text-xs text-[var(--color-muted-foreground)] text-center truncate w-16">{story.name}</p>
            </div>
          ))}
          <button className="w-16 h-20 rounded-xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="mb-6 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Suggestions</h3>
          <button className="text-sm text-[var(--color-primary)] hover:underline">See all</button>
        </div>
        <ul className="space-y-3">
          {suggestions.map((user) => (
            <li key={user.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[var(--color-foreground)] truncate">{user.name}</p>
                {user.mutualFriends && (
                  <p className="text-xs text-[var(--color-muted)]">{user.mutualFriends} mutual friends</p>
                )}
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full hover:bg-[var(--color-primary)]/20 transition-colors">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Recommendations</h3>
        <div className="grid grid-cols-2 gap-2">
          {recommendations.map((rec) => (
            <button 
              key={rec.id}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl ${rec.color} hover:opacity-80 transition-opacity`}
            >
              {rec.icon}
              <span className="text-sm font-medium">{rec.label}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
