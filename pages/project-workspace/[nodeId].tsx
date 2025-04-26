// pages/project-workspace.tsx
"use client";

import React from "react";
import WorkspaceSidebar from "./WorkspaceSidebar"
import WorkspaceEditor from "./WorkspaceEditor"
import WorkspaceSidebarRight from "./WorkspaceSidebarRight";
import { useRouter } from "next/router";
import { useAppStore } from "@/src/store/appStore";

export default function ProjectWorkspacePage() {
  const router = useRouter();
  const { nodeId } = router.query;
  const { dashboardState, isSidebarHovered } = useAppStore();

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
    <div className="min-h-screen flex flex-col">
      <header className={`fixed ${isSidebarHovered ? 'left-64' : 'left-16'} top-0 right-0 bg-white z-40 border-b transition-all duration-300`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {dashboardState.currentNode?.title || '프로젝트'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">
              마지막 저장: {new Date().toLocaleString('ko-KR')}
            </span>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden pt-10">
        <WorkspaceSidebar nodeId={nodeId} />
        <div className={`flex-1 bg-gray-50 overflow-auto ${isSidebarHovered ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <WorkspaceEditor nodeId={nodeId} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
