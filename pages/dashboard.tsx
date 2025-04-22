// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import React from "react";
import { ProjectCard } from '@/components/ui/card';
import Footer from "@/pages/componects/Footer";
import Link from "next/link";

// zustand 스토어 import
import { useAppStore } from '@/src/store/appStore';
import NewProjectModal from './componects/NewProjectModal';

// interface Project {
//   id: string;
//   title: string;
//   status: string;
//   created_at: string;
//   tags: string[] | string;
// }

export default function HomePage() {
  const router = useRouter();
  // zustand에서 꺼내기
  const projects = useAppStore((s) => s.projects);
  const setUser = useAppStore((s) => s.setUser);
  const setProjects = useAppStore((s) => s.setProjects);

  const [userName, setUserName] = useState('Guset');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function init() {
      // 1) supabase auth에서 유저 가져오기
      const {
        data: { user: authUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !authUser) {
        setError(userError?.message || '로그인 후 이용해주세요.');
        setLoading(false);
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
      setError(projectError.message);
    } else if (projData) {
      // tags 필드를 배열로 보장
      const normalized = projData.map((p) => ({
        ...p,
        tags: typeof p.tags === "string"
          ? JSON.parse(p.tags)
          : Array.isArray(p.tags)
          ? p.tags
          : [],
      }));
      setProjects(normalized);
    }

    setLoading(false);
  }
  init();
}, [router, setUser, setProjects]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <header className="flex flex-col bg-gray-900">
        <div className="flex justify-between items-center p-4">
          <Link href="/">
            <span className="font-bold text-xl">MetaOS</span>
          </Link>
          <div className="flex items-center">
            <span className="mr-4">
              현재 유저명: {userName}
            </span>
            <NewProjectModal className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out hover:animate-pulse"/>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-gray-500 p-5">
          <ul>
            {[
              { name: "Projects", path: "/project-workspace" },
              { name: "Flow", path: "/flow" },
              { name: "InfoStack", path: "/infostack" },
              { name: "Output", path: "/output" },
            ].map(item => (
              <li
                key={item.name}
                className="p-2 hover:bg-gray-400 cursor-pointer"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-2 p-4 bg-gray-300">
          <h2 className="text-2xl font-bold text-gray-700 mb-5">
            프로젝트 리스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                name={proj.title}
                status={proj.status}
                createdAt={proj.created_at}
                tags={proj.tags || []}
              />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
