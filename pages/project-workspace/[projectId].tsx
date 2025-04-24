// pages/project-workspace.tsx
"use client";

import React from "react";
import Link from "next/link";
import WorkspaceSidebar from "./WorkspaceSidebar"
import WorkspaceEditor from "./WorkspaceEditor"
import WorkspaceSidebarRight from "./WorkspaceSidebarRight";
import { useRouter } from "next/router";



export default function ProjectWorkspacePage() {
  const router = useRouter();
  const { projectId } = router.query; 

  if (!router.isReady || typeof projectId !== "string") {
    return <p>프로젝트 로딩 중...</p>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MetaOS
            </span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar projectId={projectId}/>
        <div className="flex-1 bg-gray-50 overflow-auto">
          <WorkspaceEditor projectId={projectId} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
