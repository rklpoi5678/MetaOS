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
  const { nodeId } = router.query;

  if (!router.isReady) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">로딩 중...</p>
    </div>;
  }

  if (!nodeId || typeof nodeId !== "string") {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">잘못된 프로젝트 ID입니다.</p>
    </div>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
          <Link href="/dashboard" className="transform hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MetaOS
            </span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar nodeId={nodeId} />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <WorkspaceEditor nodeId={nodeId} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
