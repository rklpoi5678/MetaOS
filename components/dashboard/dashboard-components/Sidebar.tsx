import Link from "next/link";
import RecentWorkSidebar from "./RecentWorkSidebar";

type Node = {
    id: string;
    title: string;
    parent_id: string | null;
}

type SidebarProps = {
    nodes: Node[];
    isAdmin: boolean;
}


export default function Sidebar({ nodes, isAdmin }: SidebarProps) {


return (
        <aside className="hidden sm:block fixed left-0 top-0 h-screen w-64 bg-white border-r z-50">
          <div className="p-4 border-b">
            <Link href="/" className="transform hover:scale-105 transition-transform duration-200 pl-3">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
            </Link>
          </div>
          <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-4rem)]">
            {/* 데스크톱 사이드바 내용은 기존과 동일 */}
            <div>
              <Link href="/dashboard/project" className="w-full">
                <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                  <span>➕</span>
                  <span>새 프로젝트</span>
                </div>
              </Link>
            </div>

            {/* 연구실 (admin 전용) */}
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


            {/* 즐겨찾기/핀 고정 */}
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>📌</span>
                <span>즐겨찾기</span>
              </div>
            </div>
            
            {/* 최근 작업 항목 */}
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>🕒 최근 작업</span>
              </div>
              <RecentWorkSidebar />
            </div>

            {/* 프로젝트 리스트 */}
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>📁</span>
                <span>프로젝트</span>
              </div>

              {/* 프로젝트 하위 항목 */}
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