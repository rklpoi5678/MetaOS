"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface WorkspaceSidebarProps {
  nodeId: string;
}

function WorkspaceSidebar({ nodeId }: WorkspaceSidebarProps) {
    const router = useRouter();
    const { 
      nodes, 
      setNodes, 
      isSidebarHovered, 
      setSidebarHovered,
      activeTab,
      setActiveTab
    } = useAppStore();
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    
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

    const toggleFolder = (folderId: string) => {
      setExpandedFolders(prev => {
        const newSet = new Set(prev);
        if (newSet.has(folderId)) {
          newSet.delete(folderId);
        } else {
          newSet.add(folderId);
        }
        return newSet;
      });
    };

    const rootProjectNode = nodes.find(node => node.type === 'project');

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
            <div 
              className={`flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm ${
                activeTab === 'info' ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => setActiveTab('info')}
            >
              <span>ℹ️</span>
              {isSidebarHovered && <span>프로젝트 정보</span>}
            </div>
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
          {/* 워크 플로우 */}
          <div>
            <Link href="/project-workspace/infostack">
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>🔄</span>
              {isSidebarHovered && <span>워크 플로우</span>}
            </div>
            </Link>
          </div>
          
          {/* 문서 구조 */}
          <div>
            <div 
              className={`flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm ${
                activeTab === 'document' ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => setActiveTab('document')}
            >
              <span>📑</span>
              {isSidebarHovered && <span>문서 구조</span>}
            </div>
            <div className="pl-3 space-y-1 mt-1">
              {nodes
                .filter(node => node.parent_id === rootProjectNode?.id)
                .map(node => {
                  const isFolder = node.type === 'folder';
                  const isExpanded = expandedFolders.has(node.id);

                  return (
                    <div key={node.id}>
                      <div
                        onClick={() => isFolder && toggleFolder(node.id)}
                        className={`flex items-center space-x-2 py-1.5 px-3 rounded-lg cursor-pointer text-gray-600 text-xs ${
                          isFolder ? 'hover:bg-gray-100' : ''
                        }`}
                      >
                        <span>{isFolder ? (isExpanded ? '📂' : '📁') : '📄'}</span>
                        {isFolder ? (
                          <span className="truncate">{node.title}</span>
                        ) : (
                          <Link href={`/project-workspace/${node.id}`} className="w-full">
                            <span className="truncate">{node.title}</span>
                          </Link>
                        )}
                      </div>
                      {isFolder && isExpanded && (
                        <div className="pl-4 space-y-1 mt-1">
                          {nodes
                            .filter(child => child.parent_id === node.id)
                            .map(child => (
                              <Link href={`/project-workspace/${child.id}`} key={child.id} className="w-full">
                                <div className="flex items-center space-x-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 text-xs">
                                  <span>📄</span>
                                  <span className="truncate">{child.title}</span>
                                </div>
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </nav>
      </aside>
    );
}

export default WorkspaceSidebar;