import Sidebar from "../components/Sidebar"
import SocialFeed from "../components/SocialFeed"
import RightSidebar from "../components/RightSidebar"
import MobileNav from "../components/MobileNav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <MobileNav />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 flex justify-center">
          <div className="flex w-full max-w-[1100px]">
            <SocialFeed />
            <RightSidebar />
          </div>
        </main>
      </div>
    </div>
  )
}
