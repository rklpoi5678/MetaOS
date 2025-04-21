// pages/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/pages/componects/Footer";
import Link from "next/link";

// 헤더바 컴포넌트: MetaOS 로고, 유저명, "새 프로젝트" 버튼
function Header() {
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center p-4">
        <span className="font-bold text-xl">MetaOS</span>
        <div className="flex items-center">
          <span className="mr-4">현재 유저명: user@example.com</span>
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
      <aside className="w-64 bg-gray-100 p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="p-2 hover:bg-gray-200 cursor-pointer">
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

// 개별 프로젝트 카드를 위한 컴포넌트
function ProjectCard({
  name,
  status,
  createdAt,
  tags,
}: {
  name: string;
  status: string;
  createdAt: string;
  tags: string[];
}) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <span className={status === "진행중" ? "text-green-500" : "text-red-500"}>
            {status === "진행중" ? "🟢 진행중" : "🔴 중단"}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>생성일: {createdAt}</div>
        <div className="mt-2">
          {tags.map((tag) => (
            <span key={tag} className="mr-2 text-sm text-gray-600">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Home 페이지 메인 컴포넌트
export default function HomePage() {
  // 데모용 프로젝트 데이터: 카드 갯수를 늘려서 페이지를 넓힘.
  const projects = [
    { name: "프로젝트 Alpha", status: "진행중", createdAt: "2025-04-21", tags: ["PLR", "감정루틴"] },
    { name: "프로젝트 Beta", status: "중단", createdAt: "2025-03-15", tags: ["감정루틴"] },
    { name: "프로젝트 Gamma", status: "진행중", createdAt: "2025-02-10", tags: ["PLR"] },
    { name: "프로젝트 Delta", status: "진행중", createdAt: "2025-01-05", tags: ["감정루틴", "테스트"] },
    { name: "프로젝트 Epsilon", status: "중단", createdAt: "2024-12-11", tags: ["PLR", "샘플"] },
    { name: "프로젝트 Zeta", status: "진행중", createdAt: "2024-11-20", tags: ["감정루틴"] },
    // 원하는 만큼 추가할 수 있습니다.
  ];

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">프로젝트 리스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.name}
                name={proj.name}
                status={proj.status}
                createdAt={proj.createdAt}
                tags={proj.tags}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
