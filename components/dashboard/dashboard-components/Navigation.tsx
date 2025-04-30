import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type DashboardState = {
    userName: string;
}

type NavigationProps = {
    dashboardState: DashboardState;
    onLogout?: () => Promise<void>;
}
    
export default function Navigation({ 
    dashboardState,
    onLogout
 }: NavigationProps) {
    const router = useRouter();

    const handleLogout = async () => {
        if (onLogout) {
            await onLogout();
        } else {
            await supabase.auth.signOut();
            localStorage.removeItem('isLoggedIn');
            router.push('/');
        }
    }

return (
    <header className="hidden sm:block fixed left-64 top-0 right-0 bg-white z-40 border-b">
        <div className="container mx-auto px-4 py-2 flex justify-end">
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">
                환영합니다, <span className="font-semibold">{dashboardState.userName}</span>님
                </span>
                <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                로그아웃
                </button>
                <button onClick={() => router.push('/settings')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-xl">⚙️</span>
                </button>
            </div>
        </div>
    </header>
)
}