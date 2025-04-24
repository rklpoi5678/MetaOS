// pages/index.tsx
"use client";

import React from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ProjectCard } from '@/components/ui/card';
import { supabase } from '../lib/supabaseClient';
import Footer from "@/pages/componects/Footer";
import Link from "next/link";
import { useAppStore } from '@/src/store/appStore';
import AiProjectModal from "./componects/AiProjectModal";
import RoutineDashboard from "./componects/flow/RoutineDashboard";

export default function HomePage() {
  const router = useRouter();
  const { 
    projects,
    setUser,
    setProjects,
    dashboardState,
    setUserName,
    setDashboardIsLoading,
    setDashboardError,
    setSearchQuery
  } = useAppStore();

  const [activeTab, setActiveTab] = React.useState('workflow'); // 'workflow' 또는 'projects'

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
          router.push('/login');
          return;
        }

        // 스토어에 저장
        setUser(authUser);

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('name')
          .eq('id', authUser.id)
          .single();

        if (!profileError && profile?.name) {
          setUserName(profile.name);
        }

        // 2) 프로젝트 불러오기
        const { data: projData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', authUser.id);

        if (projectError) {
          setDashboardError(projectError.message);
        } else if (projData) {
          // tags 필드를 배열로 보장
          const normalized = projData.map((p) => ({
            ...p,
            tags: Array.isArray(p.tags) ? p.tags : 
                  typeof p.tags === 'string' ? JSON.parse(p.tags) : 
                  []
          }));
          setProjects(normalized);
        }
      } catch {
        setDashboardError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setDashboardIsLoading(false);
      }
    }

    init();
  }, [router, setUser, setProjects, setUserName, setDashboardIsLoading, setDashboardError]);

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

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(dashboardState.searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MetaOS
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                환영합니다, <span className="font-semibold">{dashboardState.userName}</span>님
              </span>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  localStorage.removeItem('isLoggedIn');
                  router.push('/');
                }}
                className="px-3 py-1 text-sm text-gray-300 hover:text-white border border-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
            <AiProjectModal className="
              bg-gradient-to-r from-blue-500 to-purple-600 
              text-white font-medium
              px-4 py-2 rounded-lg
              hover:from-blue-600 hover:to-purple-700
              transform hover:scale-105
              transition-all duration-200
              shadow-lg hover:shadow-xl
            "/>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-800 text-gray-100 shadow-lg">
          <nav className="p-4 space-y-2">
            {[
              { name: "프로젝트", path: "/project-workspace", icon: "📁", tab: 'projects' },
              { name: "워크플로우", path: "/flow", icon: "🔄", tab: 'workflow' },
              { name: "정보 저장소", path: "/infostack", icon: "📚" },
              { name: "결과물", path: "/output", icon: "📤" },
            ].map(item => (
              <div 
                key={item.name}
                onClick={() => item.tab && setActiveTab(item.tab)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg 
                  hover:bg-gray-700 transition-colors duration-200 cursor-pointer
                  ${activeTab === item.tab ? 'bg-gray-700' : ''}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
                {activeTab === item.tab && (
                  <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-gray-100 overflow-auto">
          <div className="max-w-7xl mx-auto py-6">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {activeTab === 'workflow' ? '워크플로우' : '프로젝트'}
                </h2>
                <div className="flex space-x-4">
                  <input
                    type="search"
                    placeholder={activeTab === 'workflow' ? "루틴 검색..." : "프로젝트 검색..."}
                    value={dashboardState.searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {activeTab === 'workflow' ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <RoutineDashboard />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((proj) => (
                  <Link
                    href={`/project-workspace/${proj.id}`}
                    key={proj.id}
                  >
                    <ProjectCard
                      name={proj.title}
                      status={proj.status}
                      createdAt={new Date(proj.created_at).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit', 
                        day: '2-digit',
                        hour12: false,
                        minute: undefined,
                        second: undefined
                      }).replace(/\. /g, '/').replace(/\.$/, '')}
                      tags={Array.isArray(proj.tags) ? proj.tags : []}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
