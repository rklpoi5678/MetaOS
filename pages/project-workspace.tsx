// pages/project-workspace.tsx
"use client";

import React from "react";
import Link from "next/link";
import WorkspaceSidebar from "./componects/WorkspaceSidebar"
import WorkspaceEditor from "./componects/WorkspaceEditor"
import WorkspaceSidebarRight from "./componects/WorkspaceSidebarRight";



export default function ProjectWorkspacePage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="p-4 bg-white shadow-md flex items-center">
        <Link href="/dashboard" className="text-2xl font-bold mr-4 text-gray-900 hover:text-gray-600">MetaOS</Link>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <WorkspaceEditor />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
