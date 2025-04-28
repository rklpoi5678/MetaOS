// pages/index.tsx
"use client";

import React from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/components/ui/card';
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useAppStore } from '@/src/store/appStore';
import RoutineDashboard from "@/components/research-lab/flow/RoutineDashboard";
import OutputEngine from "@/components/research-lab/output/OutputEngine";

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

  const [activeTab] = React.useState('projects'); // 초기값을 'projects'로 설정

  useEffect(() => {
    async function init() {
      setDashboardIsLoading(true);
      setDashboardError(null);

      try {
        // 1) supabase auth에서 유저 가져오기
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

        // 스토어에 저장
        setUser(authUser);

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('name, role')
          .eq('id', authUser.id)
          .single();

        // admin 권한 체크 및 상태 저장
        const isAdmin = profile?.role === 'admin';
        useAppStore.setState({ isAdmin });

        if (!profileError && profile?.name) {
          setUserName(profile.name);
        }

        // 2) 프로젝트 불러오기
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">데이터를 불러오는 중</h2>
        <p className="text-gray-500 mt-2">잠시만 기다려주세요...</p>
      </div>
    </div>
  );

  if (dashboardState.error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">{dashboardState.error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
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
      <header className="fixed left-64 top-0 right-0 bg-white z-40 border-b">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">
              환영합니다, <span className="font-semibold">{dashboardState.userName}</span>님
            </span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                localStorage.removeItem('isLoggedIn');
                router.push('/');
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              로그아웃
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden pt-10">
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r z-50">
          <div className="p-4 border-b">
            <Link href="/" className="transform hover:scale-105 transition-transform duration-200 pl-3">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
            </Link>
          </div>
          <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-4rem)]">
            {/* 새 프로젝트 만들기 */}
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

            {/* 최근 작업 항목 */}
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>🕒</span>
                <span>최근 작업</span>
              </div>
            </div>

            {/* 즐겨찾기/핀 고정 */}
            <div>
              <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-gray-600 text-sm">
                <span>📌</span>
                <span>즐겨찾기</span>
              </div>
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

        <main className="flex-1 bg-gray-50 overflow-auto ml-64 pt-10">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {activeTab === 'workflow' ? '워크플로우' : 
                   activeTab === 'infostack' ? '정보 저장소' :
                   activeTab === 'output' ? '결과물' : '프로젝트'}
                </h2>
                <div className="flex space-x-4">
                  <input
                    type="search"
                    placeholder="프로젝트 검색..."
                    value={dashboardState.searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                  />
                </div>
              </div>
            </div>

            {activeTab === 'workflow' ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <RoutineDashboard />
              </div>
            ) : activeTab === 'output' ? (
              <OutputEngine />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((proj) => (
                  <Link
                    href={`/dashboard/project-workspace/${proj.id}`}
                    key={proj.id}
                  >
                    <ProjectCard
                      name={proj.title}
                      createdAt={`${proj.created_at.substring(0,4)}년 ${proj.created_at.substring(5,7)}월 ${proj.created_at.substring(8,10)}일`}
                      updatedAt={`${proj.updated_at.substring(0,4)}년 ${proj.updated_at.substring(5,7)}월 ${proj.updated_at.substring(8,10)}일`}
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
