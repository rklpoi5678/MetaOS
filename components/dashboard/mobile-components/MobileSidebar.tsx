'use client'

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RecentWorkSidebar from "../dashboard-components/RecentWorkSidebar";

type Node = {
    id: string;
    title: string;
    parent_id: string | null;
}

type DashboardState = {
    userName: string;
}


export default function MobileSidebar({
  nodes,
  dashboardState,
  isAdmin,
  isSidebarOpen
 }: { 
  nodes: Node[];
  dashboardState: DashboardState;
  isAdmin: boolean;
  isSidebarOpen: boolean;
 }) {

    const router = useRouter();
    return (
        <aside className={`sm:hidden fixed left-0 top-12 h-[calc(100vh-3rem)] w-full bg-white border-r z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">
                환영합니다, <span className="font-semibold">{dashboardState.userName}</span>님
              </span>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  localStorage.removeItem('isLoggedIn');
                  router.push('/');
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg"
              >
                로그아웃
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-7rem)]">
            {/* 사이드바 내용은 데스크톱과 동일 */}
            <div>
              <Link href="/dashboard/project" className="w-full">
                <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                  <span>➕</span>
                  <span>새 프로젝트</span>
                </div>
              </Link>
            </div>

            {isAdmin && (
              <div>
                <Link href="/dashboard/research-lab" className="w-full">
                  <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                    <span>🔬</span>
                    <span>연구실</span>
                  </div>
                </Link>
              </div>
            )}


            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>📌</span>
                <span>즐겨찾기</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>🕒 최근 작업</span>
              </div>
              <RecentWorkSidebar />
            </div>
            
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>📁</span>
                <span>프로젝트</span>
              </div>

              <div className="pl-3 space-y-1 mt-1">
                {nodes.filter(node => node.parent_id === null).map(node => (
                  <Link href={`/dashboard/project-workspace/${node.id}`} key={node.id} className="w-full">
                    <div className="flex items-center space-x-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 text-xs">
                      <span>📄</span>
                      <span className="truncate">{node.title}</span>
                    </div>
                  </Link>
                ))} 
              </div>
            </div>
          </nav>
        </aside>
    );
}