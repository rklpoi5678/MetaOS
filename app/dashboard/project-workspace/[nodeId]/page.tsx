// app/dashboard/project-workspace/[nodeId]/page.tsx
'use client'

import { useEffect, useState } from "react";
import WorkspaceSidebar from "@/components/dashboard/projecct-workspace/WorkspaceSidebar"
import WorkspaceEditor from "@/app/dashboard/project-workspace/components/WorkspaceEditor"
import WorkspaceSidebarRight from "@/components/dashboard/projecct-workspace/WorkspaceSidebarRight";
import { useParams, useRouter } from "next/navigation";
import { useAppStore, Node } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { isSidebarHovered, setCurrentNode } = useAppStore();
  const [rootProject, setRootProject] = useState<Node | null>(null);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const nodeId = params?.nodeId as string;

  useEffect(() => { 
    const fetchNode = async () => {
      try {
        setIsLoading(true);
        const { data: node, error } = await supabase
          .from('nodes')
          .select('*')
          .eq('id', nodeId)
          .single();

        if (error || !node) {
          // console.error('노드 조회 실패:', error);
          router.push('/dashboard');
          return;
        }

        // console.log('현재 노드:', node);
        setCurrentNode(node);

        // 현재 노드가 project 타입이면 그 자체를 루트 프로젝트로 설정
        if (node.type === 'project') {
          // console.log('현재 노드가 프로젝트 타입:', node);
          setRootProject(node);
          setIsLoading(false);
          return;
        }

        // 루트 프로젝트 찾기
        let current = node;
        let foundRootProject = null;

        while (current?.parent_id) {
          const { data: parent, error: parentError } = await supabase
            .from('nodes')
            .select('*')
            .eq('id', current.parent_id)
            .single();

          if (parentError || !parent) {
            // console.error('부모 노드 조회 실패:', parentError);
            break;
          }

          // console.log('부모 노드:', parent);

          if (parent.type === 'project') {
            // console.log('루트 프로젝트 찾음:', parent);
            foundRootProject = parent;
            break;
          }

          current = parent;
        }

        if (foundRootProject) {
          // console.log('최종 루트 프로젝트 설정:', foundRootProject);
          setRootProject(foundRootProject);
        } else {
          // console.log('루트 프로젝트를 찾지 못함');
          setRootProject(null);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('노드 조회 오류:', error);
        router.push('/dashboard');
      }
    };
  
    fetchNode();
  }, [nodeId, setCurrentNode, router]);

  // 마지막 저장 시간 업데이트
  useEffect(() => {
    const updateLastSaved = () => {
      setLastSaved(new Date().toLocaleString('ko-KR'));
    };

    // 초기 시간 설정
    updateLastSaved();

    // 1분마다 시간 업데이트
    const interval = setInterval(updateLastSaved, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!params?.nodeId || typeof params.nodeId !== 'string') {
    return <div>잘못된 접근입니다</div>;
  }
  
  if (!nodeId) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">잘못된 프로젝트 ID입니다.</p>
    </div>;
  }

  // console.log('렌더링 시 rootProject:', rootProject);

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`fixed ${isSidebarHovered ? 'left-64' : 'left-16'} top-0 right-0 bg-white z-40 border-b transition-all duration-300`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">
              {rootProject?.title || '프로젝트 이름을 불러오는 중...'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">
              마지막 저장: {lastSaved}
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
      <WorkspaceSidebar 
        nodeId={nodeId} 
        rootProjectId={rootProject?.id ?? null} 
        isLoading={isLoading}
      />
      <div className="flex flex-1 overflow-hidden pt-10">
        <div className={`flex-1 bg-gray-50 overflow-auto ${isSidebarHovered ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <WorkspaceEditor nodeId={nodeId} rootProjectId={rootProject?.id ?? null} />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
