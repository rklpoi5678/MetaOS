// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/components/ui/card';
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useAppStore } from '@/src/store/appStore';
import RoutineDashboard from "@/components/research-lab/flow/RoutineDashboard";
import OutputEngine from "@/components/research-lab/output/OutputEngine";
import MobileNavigation from "@/components/dashboard/mobile-components/MobileNavigation";
import MobileSidebar from "@/components/dashboard/mobile-components/MobileSidebar";
import Navigation from "@/components/dashboard/dashboard-components/Navigation";
import Sidebar from "@/components/dashboard/dashboard-components/Sidebar";

export default function HomePage() {
  const router = useRouter();
  const { 
    nodes,
    setUser,
    setNodes,
    dashboardState,
    setUserName,
    setDashboardIsLoading,
    setDashboardError,
    setSearchQuery,
    isAdmin
  } = useAppStore();

  const [activeTab] = React.useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function init() {
      setDashboardIsLoading(true);
      setDashboardError(null);

      try {
        const {
          data: { user: authUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !authUser) {
          setDashboardError(userError?.message || '로그인 후 이용해주세요.');
          localStorage.removeItem('isLoggedIn');
          router.push('/signin');
          return;
        }

        setUser(authUser);

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('name, role')
          .eq('id', authUser.id)
          .single();

        const isAdmin = profile?.role === 'admin';
        useAppStore.setState({ isAdmin });

        if (!profileError && profile?.name) {
          setUserName(profile.name);
        }

        const { data: nodesData, error: nodesError } = await supabase
          .from('nodes')
          .select('*')
          .eq('user_id', authUser.id);

        if (nodesError) {
          setDashboardError(nodesError.message);
        } else if (nodesData) {
          setNodes(nodesData);
        }
        
      } catch {
        setDashboardError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setDashboardIsLoading(false);
      }
    }

    init();
  }, [router, setUser, setNodes, setUserName, setDashboardIsLoading, setDashboardError]);

  if (dashboardState.isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">데이터를 불러오는 중</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">잠시만 기다려주세요...</p>
      </div>
    </div>
  );

  if (dashboardState.error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 sm:p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-red-500 text-4xl sm:text-5xl mb-4">⚠️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">오류가 발생했습니다</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">{dashboardState.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );

  const filteredProjects = nodes.filter(node => 
    node.parent_id === null && 
    node.title.toLowerCase().includes(dashboardState.searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* 모바일 헤더 */}
      <MobileNavigation isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* 데스크톱 헤더 */}
      <Navigation dashboardState={dashboardState} />

      <div className="flex flex-1 overflow-hidden pt-12 sm:pt-10">
      {/* 모바일 사이드바 */}
      <MobileSidebar nodes={nodes} dashboardState={dashboardState} isAdmin={isAdmin} isSidebarOpen={isSidebarOpen}/>

      {/* 데스크톱 사이드바 */}
      <Sidebar nodes={nodes} isAdmin={isAdmin} />

        <main className="flex-1 bg-gray-50 overflow-auto sm:ml-64 pt-12 sm:pt-10">
          <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4">
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {activeTab === 'workflow' ? '워크플로우' : 
                   activeTab === 'infostack' ? '정보 저장소' :
                   activeTab === 'output' ? '결과물' : '프로젝트'}
                </h2>
                <div className="w-full sm:w-auto">
                  <input
                    type="search"
                    placeholder="프로젝트 검색..."
                    value={dashboardState.searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {activeTab === 'workflow' ? (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <RoutineDashboard />
              </div>
            ) : activeTab === 'output' ? (
              <OutputEngine />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProjects.map((node) => (
                  <Link
                    href={`/dashboard/project-workspace/${node.id}?rootProjectId=${node.id}`}
                    key={node.id}
                  >
                    <ProjectCard
                      name={node.title}
                      createdAt={`${node.created_at.substring(0,4)}년 ${node.created_at.substring(5,7)}월 ${node.created_at.substring(8,10)}일`}
                      updatedAt={`${node.updated_at.substring(0,4)}년 ${node.updated_at.substring(5,7)}월 ${node.updated_at.substring(8,10)}일`}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
