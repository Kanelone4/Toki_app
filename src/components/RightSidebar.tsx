"use client"

import { Plus, Music, Utensils, Mountain, Palette } from "lucide-react"

const stories = [
  { id: "1", name: "Anatoly P.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=160&fit=crop", hasNew: true },
  { id: "2", name: "Lolita Earns", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&h=160&fit=crop", hasNew: true },
]

const suggestions = [
  { id: "1", name: "Nick Shelburne", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
  { id: "2", name: "Brittni Lando", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { id: "3", name: "Ivan Shevchenko", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
]

const recommendations = [
  { id: "1", label: "UI/UX", icon: Palette, bg: "bg-slate-100", text: "text-slate-600" },
  { id: "2", label: "Music", icon: Music, bg: "bg-pink-100", text: "text-pink-600" },
  { id: "3", label: "Cooking", icon: Utensils, bg: "bg-orange-100", text: "text-orange-600" },
  { id: "4", label: "Hiking", icon: Mountain, bg: "bg-purple-100", text: "text-purple-600" },
]

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-[280px] p-5 pl-0">
      {/* Stories */}
      <section className="mb-5">
        <h3 className="font-semibold text-[var(--color-text)] mb-3">Stories</h3>
        <div className="flex gap-2">
          {stories.map((story) => (
            <div key={story.id} className="cursor-pointer group">
              <div className={`w-[68px] h-[90px] rounded-xl overflow-hidden relative ${
                story.hasNew ? "ring-2 ring-[var(--color-primary)] ring-offset-2" : ""
              }`}>
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] text-center truncate w-[68px]">
                {story.name}
              </p>
            </div>
          ))}
          <div className="cursor-pointer">
            <div className="w-[68px] h-[90px] rounded-xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] transition-colors">
              <Plus size={24} className="text-[var(--color-text-muted)]" />
            </div>
            <p className="mt-1.5 text-xs text-[var(--color-text-muted)] text-center">Add Story</p>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section className="mb-5 bg-[var(--color-white)] rounded-xl p-4 border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[var(--color-text)]">Suggestions</h3>
          <button className="text-sm text-[var(--color-primary)] font-medium hover:underline">See all</button>
        </div>
        <ul className="space-y-3">
          {suggestions.map((user) => (
            <li key={user.id} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <span className="flex-1 font-medium text-sm text-[var(--color-text)] truncate">{user.name}</span>
              <button className="px-3 py-1 text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommendations */}
      <section className="bg-[var(--color-white)] rounded-xl p-4 border border-[var(--color-border)]">
        <h3 className="font-semibold text-[var(--color-text)] mb-3">Recommendations</h3>
        <div className="grid grid-cols-2 gap-2">
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <button 
                key={rec.id}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${rec.bg} hover:opacity-80 transition-opacity`}
              >
                <Icon size={18} className={rec.text} />
                <span className={`text-sm font-medium ${rec.text}`}>{rec.label}</span>
              </button>
            )
          })}
        </div>
      </section>
    </aside>
  )
}
