import Sidebar from "../components/Sidebar"
import SocialFeed from "../components/SocialFeed"
import RightSidebar from "../components/RightSidebar"
import MobileNav from "../components/MobileNav"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <MobileNav />
      
      {/* Main Layout */}
      <div className="flex justify-center">
        {/* Left Sidebar - Hidden on mobile/tablet */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen max-w-[1200px]">
          <div className="flex">
            <SocialFeed />
            {/* Right Sidebar - Hidden on smaller screens */}
            <RightSidebar />
          </div>
        </main>
      </div>
    </div>
  )
}
