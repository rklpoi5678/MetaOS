import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MobileNavigation({ 
  isSidebarOpen, 
  setIsSidebarOpen
}: { 
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
 }) {
    const router = useRouter()

    return (
        
        <div className="sm:hidden fixed top-0 left-0 right-0 bg-white z-50 border-b p-2">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600"
          >
            <span className="text-2xl">☰</span>
          </button>
          <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MetaOS
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <button onClick={() => router.push('/settings')} className="p-2 text-gray-600">
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    );
}