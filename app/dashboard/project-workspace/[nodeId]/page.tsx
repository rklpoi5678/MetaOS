// app/dashboard/project-workspace/[nodeId]/page.tsx
'use client'

import { useEffect, useState } from "react";
import WorkspaceSidebar from "@/components/projecct-workspace/WorkspaceSidebar"
import WorkspaceEditor from "@/app/dashboard/project-workspace/components/WorkspaceEditor"
import WorkspaceSidebarRight from "@/components/projecct-workspace/WorkspaceSidebarRight";
import { useParams, useRouter } from "next/navigation";
import { useAppStore, Node } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { isSidebarHovered, setCurrentNode } = useAppStore();
  const [rootProject, setRootProject] = useState<Node | null>(null);
  const nodeId = params?.nodeId as string;

  useEffect(() => { 
    const fetchNode = async () => {
      try {
        const { data: node, error } = await supabase
          .from('nodes')
          .select('*')
          .eq('id', nodeId)
          .single();

      if (error || !node) {
        router.push('/dashboard');
        return;
      }

      setCurrentNode(node);

      // 현재 노드가 project 타입이면 그 자체를 루트 프로젝트로 설정
      if (node.type === 'project') {
        setRootProject(node);
        return;
      }

      // 루트 프로젝트 찾기
      let current = node;

      while (current?.parent_id) {
        const { data: parent, error: parentError } = await supabase
          .from('nodes')
          .select('*')
          .eq('id', current.parent_id)
          .single();

        if (parentError || !parent) break;

        if (parent.type === 'project') {
          setRootProject(parent);
          break;
        }

        current = parent;
      }

      setRootProject(null);

    } catch (error) {
      console.error('노드 조회 오류:', error);
      router.push('/dashboard');
    }
  }
  
    fetchNode();
  }, [nodeId, setCurrentNode, router]);

  if (!params?.nodeId || typeof params.nodeId !== 'string') {
    return <div>잘못된 접근입니다</div>;
  }
  
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
              {rootProject?.title ?? '프로젝트 이름을 불러오는 중...'}
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
      <WorkspaceSidebar nodeId={nodeId} rootProjectId={rootProject?.id ?? null} />
      <div className="flex flex-1 overflow-hidden pt-10">
        <div className={`flex-1 bg-gray-50 overflow-auto ${isSidebarHovered ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <WorkspaceEditor nodeId={nodeId} rootProjectId={rootProject?.id ?? null} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
