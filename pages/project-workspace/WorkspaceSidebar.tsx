"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface WorkspaceSidebarProps {
  nodeId: string;
}

function WorkspaceSidebar({ nodeId }: WorkspaceSidebarProps) {
    const router = useRouter();
    const { nodes, setNodes, currentNode, isSidebarHovered, setSidebarHovered } = useAppStore();
    
    useEffect(() => {
      if (!nodeId) return;
      (async () => {
        const { data, error } = await supabase
          .from("nodes")
          .select("*")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)

        if (error) {
          console.error("프로젝트 노드 조회 오류:", error);
          return;
        }

        setNodes(data);
      })();
    }, [nodeId, setNodes]);

    if (!router.isReady) return <p>프로젝트 로딩중 ...</p>;

    return (
      <aside 
        className={`fixed left-0 top-0 h-screen bg-white border-r z-50 transition-all duration-300 ${
          isSidebarHovered ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className="p-4 border-b">
          <Link href="/dashboard" className="transform hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isSidebarHovered ? 'MetaOS' : 'M'}
            </span>
          </Link>
        </div>
        <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* 프로젝트 정보 */}
          <div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>ℹ️</span>
              {isSidebarHovered && <span>프로젝트 정보</span>}
            </div>
          </div>

          {/* 문서 구조 */}
          <div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>📑</span>
              {isSidebarHovered && <span>문서 구조</span>}
            </div>
            {isSidebarHovered && (
              <div className="pl-3 space-y-1 mt-1">
                {nodes.filter(node => node.parent_id === currentNode?.id).map(node => (
                  <Link href={`/project-workspace/${node.id}`} key={node.id} className="w-full">
                    <div className="flex items-center space-x-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 text-xs">
                      <span>📄</span>
                      <span className="truncate">{node.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
                    )}
                  </div>

          {/* 작업 기록 */}
          <div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>📝</span>
              {isSidebarHovered && <span>작업 기록</span>}
            </div>
          </div>

          {/* 협업 */}
          <div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>👥</span>
              {isSidebarHovered && <span>협업</span>}
            </div>
          </div>
        </nav>
      </aside>
    );
}

export default WorkspaceSidebar;