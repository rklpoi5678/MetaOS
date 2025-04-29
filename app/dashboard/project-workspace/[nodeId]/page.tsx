// pages/project-workspace.tsx
'use client'

import React from "react";
import WorkspaceSidebar from "@/app/dashboard/project-workspace/components/WorkspaceSidebar"
import WorkspaceEditor from "@/app/dashboard/project-workspace/components/WorkspaceEditor"
import WorkspaceSidebarRight from "@/app/dashboard/project-workspace/components/WorkspaceSidebarRight";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/src/store/appStore";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { dashboardState, isSidebarHovered } = useAppStore();
  
  if (!params) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">잘못된 접근입니다.</p>
    </div>;
  }
  const nodeId = params?.nodeId as string;

  if (!nodeId) {
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
            <button 
              onClick={() => router.push('/settings')}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </header>
      <WorkspaceSidebar nodeId={nodeId} />
      <div className="flex flex-1 overflow-hidden pt-10">
        <div className={`flex-1 bg-gray-50 overflow-auto ${isSidebarHovered ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <WorkspaceEditor nodeId={nodeId} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
