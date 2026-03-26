"use client"

import { Plus, Music, Utensils, Mountain, Palette } from "lucide-react"

interface Story {
  id: string
  name: string
  image: string
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
  bgColor: string
  textColor: string
  iconBg: string
}

const stories: Story[] = [
  { 
    id: "1", 
    name: "Anatoly P.", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop", 
    hasNew: true 
  },
  { 
    id: "2", 
    name: "Lolita Earns", 
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&h=160&fit=crop", 
    hasNew: true 
  },
]

const suggestions: Suggestion[] = [
  { id: "1", name: "Nick Shelburne", avatar: "https://randomuser.me/api/portraits/men/42.jpg", mutualFriends: 12 },
  { id: "2", name: "Brittni Lando", avatar: "https://randomuser.me/api/portraits/women/28.jpg", mutualFriends: 8 },
  { id: "3", name: "Ivan Shevchenko", avatar: "https://randomuser.me/api/portraits/men/56.jpg", mutualFriends: 5 },
]

const recommendations: Recommendation[] = [
  { 
    id: "1", 
    label: "UI/UX", 
    icon: <Palette size={20} />, 
    bgColor: "bg-slate-50",
    textColor: "text-slate-700",
    iconBg: "bg-slate-200"
  },
  { 
    id: "2", 
    label: "Music", 
    icon: <Music size={20} />, 
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    iconBg: "bg-pink-200"
  },
  { 
    id: "3", 
    label: "Cooking", 
    icon: <Utensils size={20} />, 
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    iconBg: "bg-orange-200"
  },
  { 
    id: "4", 
    label: "Hiking", 
    icon: <Mountain size={20} />, 
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    iconBg: "bg-violet-200"
  },
]

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-[300px] h-screen sticky top-0 overflow-y-auto py-6 pr-6 pl-2">
      {/* Stories Section */}
      <section className="mb-6">
        <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-4 px-1">Stories</h3>
        <div className="flex gap-3">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center group cursor-pointer">
              <div className="relative">
                {/* Gradient border for new stories */}
                <div className={`w-[72px] h-[96px] rounded-2xl p-[2px] ${
                  story.hasNew 
                    ? "bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]" 
                    : "bg-[var(--color-border)]"
                }`}>
                  <div className="w-full h-full rounded-[14px] overflow-hidden relative">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs font-medium text-[var(--color-muted-foreground)] text-center truncate w-[72px]">
                {story.name}
              </p>
            </div>
          ))}
          {/* Add story button */}
          <div className="flex flex-col items-center">
            <button className="w-[72px] h-[96px] rounded-2xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-200">
              <Plus size={24} />
            </button>
            <p className="mt-2 text-xs font-medium text-[var(--color-muted)] text-center">Add Story</p>
          </div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="mb-6 bg-white rounded-3xl p-5 shadow-[var(--shadow)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[var(--color-foreground)]">Suggestions</h3>
          <button className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
            See all
          </button>
        </div>
        <ul className="space-y-4">
          {suggestions.map((user) => (
            <li key={user.id} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--color-border-light)] group-hover:ring-[var(--color-primary)]/30 transition-all">
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
              <button className="px-4 py-1.5 text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white rounded-3xl p-5 shadow-[var(--shadow)]">
        <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-4">Recommendations</h3>
        <div className="grid grid-cols-2 gap-3">
          {recommendations.map((rec) => (
            <button 
              key={rec.id}
              className={`flex items-center gap-2.5 px-4 py-3.5 rounded-2xl ${rec.bgColor} hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
            >
              <span className={`w-8 h-8 rounded-xl ${rec.iconBg} flex items-center justify-center ${rec.textColor}`}>
                {rec.icon}
              </span>
              <span className={`text-sm font-semibold ${rec.textColor}`}>{rec.label}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
