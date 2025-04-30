'use client'

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Activity from "@/app/dashboard/project-workspace/AcivityItem/activity";

interface WorkspaceSidebarProps {
  nodeId: string;
  rootProjectId: string | null;
  isLoading?: boolean;
  isMobile?: boolean;
  isMobileSidebarOpen: boolean;
  onClose: () => void;
}


function WorkspaceSidebar({ nodeId, rootProjectId, isLoading = false, isMobile = false, isMobileSidebarOpen = false, onClose }: WorkspaceSidebarProps) {
    const searchParams = useSearchParams();
    const { 
      nodes, 
      setNodes, 
      isSidebarHovered, 
      setSidebarHovered,
      activeTab,
      setActiveTab,
      setCurrentNode
    } = useAppStore();
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
    const [mounted, setMounted] = useState(false);
    
    // 클라이언트 사이드에서만 실행되도록 수정
    useEffect(() => {
      setMounted(true);
    }, []);

    // URL에서 rootProjectId 가져오기
    const urlRootProjectId = mounted ? searchParams?.get('rootProjectId') : null;
    
    useEffect(() => {
      if (!mounted || !nodeId) return;

      const fetchNodes = async () => {
        try {
          const { data, error } = await supabase
            .from("nodes")
            .select("*")
            .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

          if (error) {
            console.error("프로젝트 노드 조회 오류:", error);
            return;
          }

          setNodes(data);
          setCurrentNode(data.find(node => node.id === nodeId));
        } catch (error) {
          console.error('노드 데이터 로드 중 오류:', error);
        }
      };

      fetchNodes();
    }, [nodeId, rootProjectId, urlRootProjectId, setNodes, setCurrentNode, mounted]);

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

    if (!mounted) {
      return null;
    }

    if (isLoading) {
      return (
        <aside className="w-64 bg-white border-r p-4">
          <p className="text-gray-400">문서 구조를 불러오는 중...</p>
        </aside>
      );
    }

    const effectiveRootProjectId = urlRootProjectId || rootProjectId;

    if (!effectiveRootProjectId) {
      return (
        <aside className="w-64 bg-white border-r p-4">
          <p className="text-gray-400">프로젝트를 선택해주세요.</p>
        </aside>
      );
    }

    return (
    <>
      {isMobile ? (
      <>
        {/* 모바일 사이드바 오버레이 */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-0 bg-black bg-opacity-30 sm:hidden"
            onClick={onClose}
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 h-screen w-64 z-50 bg-white border-r transition-transform duration-300 sm:hidden
            ${ isMobileSidebarOpen ? `translate-x-0` : `-translate-x-full`
            }`}
          >
          <div className="p-4 border-b flex justify-between items-center">
            <Link href="/dashboard" className="transform hover:scale-105 transition-transform duration-200">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
            </Link>
              <button onClick={onClose} className="text-xl text-gray-500">✕</button>
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
               <span>프로젝트 정보</span>
            </div>
          </div>

          {/* 작업 기록 */}
          <div>
            <Link href="/dashboard/project-workspace/activity">
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>📝</span>
              <span>작업 기록</span>
            </div>
            </Link>
          </div>

          {/* 협업 */}
          <div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>👥</span>
              <span>협업</span>
            </div>
          </div>
          {/* 워크 플로우 */}
          <div>
            <Link href={`/dashboard/project-workspace/infostack?nodeId=${nodeId}`}>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>🔄</span>
              <span>워크 플로우</span>
            </div>
            </Link>
          </div>
          
          {/* 문서 구조 */}
          <div>
            <div className="border-t my-3"></div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-600 text-sm">
              <span>📑</span>
              <span>문서 구조</span>
            </div>
            <div className="pl-3 space-y-1 mt-1">
              {nodes
                .filter(node => node.parent_id === effectiveRootProjectId)
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
                        {isFolder 
                        ? <span className="truncate">{node.title}</span>
                        : <Link href={`/dashboard/project-workspace/${node.id}?rootProjectId=${effectiveRootProjectId}`}>{node.title}</Link>
                        }
                      </div>

                      {isFolder && isExpanded && (
                        <div className="pl-4 space-y-1 mt-1">
                          {nodes
                            .filter(child => child.parent_id === node.id)
                            .map(child => (
                              <Link 
                                key={child.id} 
                                href={`/dashboard/project-workspace/${child.id}?rootProjectId=${effectiveRootProjectId}`} 
                                onClick={() => setActiveTab('document')}
                                className="w-full"
                              >
                                <div 
                                  className="flex items-center space-x-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 text-xs"
                                >
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
      </>
      ) : (
      // {#PC}
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
            <Link href="/dashboard/project-workspace/activity">
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>📝</span>
              {isSidebarHovered && <span>작업 기록</span>}
              <Activity />
            </div>
            </Link>
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
            <Link href={`/dashboard/project-workspace/infostack?nodeId=${nodeId}`}>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
              <span>🔄</span>
              {isSidebarHovered && <span>워크 플로우</span>}
            </div>
            </Link>
          </div>
          
          {/* 문서 구조 */}
          <div>
            <div className="border-t my-3"></div>
            <div className="flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-600 text-sm">
              <span>📑</span>
              <span>문서 구조</span>
            </div>
            <div className="pl-3 space-y-1 mt-1">
              {nodes
                .filter(node => node.parent_id === effectiveRootProjectId)
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
                        {isFolder 
                        ? <span className="truncate">{node.title}</span>
                        : <Link href={`/dashboard/project-workspace/${node.id}?rootProjectId=${effectiveRootProjectId}`}>{node.title}</Link>
                        }
                      </div>

                      {isFolder && isExpanded && (
                        <div className="pl-4 space-y-1 mt-1">
                          {nodes
                            .filter(child => child.parent_id === node.id)
                            .map(child => (
                              <Link 
                                key={child.id} 
                                href={`/dashboard/project-workspace/${child.id}?rootProjectId=${effectiveRootProjectId}`} 
                                onClick={() => setActiveTab('document')}
                                className="w-full"
                              >
                                <div 
                                  className="flex items-center space-x-2 py-1.5 px-3 rounded-lg hover:bg-gray-100 text-gray-600 text-xs"
                                >
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
      )}
    </>
    );
}

export default WorkspaceSidebar;