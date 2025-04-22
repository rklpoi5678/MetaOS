// pages/index.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import React from "react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from '@/components/ui/card';
import Footer from "@/pages/componects/Footer";
import Link from "next/link";
// pages/index.js (HomePage)

interface Project {
  id: string;
  title: string;
  status: string;
  created_at: string;
  tags: string[];
}

// 헤더바 컴포넌트: MetaOS 로고, 유저명, "새 프로젝트" 버튼
function Header() {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    async function fetchUserName() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('Auth Error:', authError);
        return;
      }

      // 커스텀 users 테이블에서 이름 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', user.id)
        .maybeSingle();
        console.log('현재 로그인 ID:', user.id);
        console.log('user.id:', user.id, user.id.length);

        console.log('data from users table:', data);
      if (error) {
        console.error('DB Error:', error);
      } 
      if (data?.name) {
        setUserName(data.name);
      } else {
        console.log('No name found in users table.');
      }
    }

    fetchUserName();
  }, []);


  return (
    <header className="flex flex-col bg-gray-900">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
        <span className="font-bold text-xl">MetaOS</span>
        </Link>
        <div className="flex items-center">
          <span className="mr-4">현재 유저명: {userName}</span>
          <Link href="/componects/NewProjectModal">
            <Button>새 프로젝트</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// 사이드바 컴포넌트: 메뉴 항목
function Sidebar() {
    const menuItems = [
      { name: "Projects", path: "/project-workspace" },
      { name: "Flow", path: "/flow" },
      { name: "InfoStack", path: "/infostack" },
      { name: "Output", path: "/output" },
    ];
  
    return (
      <aside className="w-64 bg-gray-500 p-5">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="p-2 hover:bg-gray-400 cursor-pointer">
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }



export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      // 현재 로그인한 사용자를 가져옵니다.
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }
      if (!user) {
        // 로그인 상태가 아니면 로그인 페이지로 이동하도록 처리할 수 있습니다.
        setError('로그인 후 이용해주세요.');
        setLoading(false);
        router.push('/login');
        return;
      }

      // 현재 사용자의 프로젝트를 조회합니다.
      const { data, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id);

      if (projectError) {
        setError(projectError.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [router]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-2 p-4 bg-gray-300">
          <h2 className="text-2xl font-bold text-gray-700 mb-5">프로젝트 리스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                name={proj.title}           // Supabase에서 프로젝트명은 `title` 컬럼에 저장된다고 가정
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
