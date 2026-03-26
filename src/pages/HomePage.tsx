import Sidebar from "../components/Sidebar"
import SocialFeed from "../components/SocialFeed"
import RightSidebar from "../components/RightSidebar"
import MobileNav from "../components/MobileNav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Mobile Header */}
      <MobileNav />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar - Hidden on mobile */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <SocialFeed />
        </main>
        
        {/* Right Sidebar - Hidden on tablet and below */}
        <RightSidebar />
      </div>
    </div>
  )
}
