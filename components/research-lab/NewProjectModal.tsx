// components/NewProjectModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { useAppStore } from "@/src/store/appStore";

// 템플릿 카드 컴포넌트
function TemplateCard({
  icon,
  title,
  description,
  selected,
  onSelect,
}: {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`border p-4 rounded-md cursor-pointer transition-colors duration-200 ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      } hover:shadow-lg`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold mb-1">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}

export default function NewProjectModal({ className }: { className?: string }) {
  const router = useRouter();
  const { 
    newProjectState,
    setProjectName,
    setSelectedTemplate,
    toggleTag,
    setIsLoading,
    setError,
    resetNewProjectState,
    setProjects
  } = useAppStore();

  const templates = [
    { id: "plr", icon: "📘", title: "PLR 마켓플레이스", description: "시장 분석 중심 템플릿" },
    { id: "emotion", icon: "🔥", title: "삐삐 감정루프", description: "감정 루프 기반의 작업 흐름" },
    { id: "empty", icon: "🌀", title: "빈 프로젝트", description: "빈 템플릿, 직접 구조 구성" },
  ];

  const handleCreate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError("로그인이 필요합니다.");
        return;
      }

      // 1. 프로젝트 생성
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            user_id: user.id,
            title: newProjectState.projectName,
            status: "in_progress",
            template: newProjectState.selectedTemplate,
            tags: newProjectState.selectedTags,
          },
        ])
        .select()
        .single();

      if (projectError) {
        setError("프로젝트 생성에 실패했습니다.");
        return;
      }

      // 2. 기본 프로젝트 노드 생성
      const projectNodes = [
        {
          project_id: project.id,
          type: 'folder',
          title: '00_Core',
          content: null,
          sort_order: 0,
        },
        {
          project_id: project.id,
          type: 'folder',
          title: '01_Structure',
          content: null,
          sort_order: 1,
        },
        {
          project_id: project.id,
          type: 'folder',
          title: '02_Tool',
          content: null,
          sort_order: 2,
        },
      ];

      // 필수 폴더가 모두 있는지 확인
      const requiredFolders = ['00_Core', '01_Structure', '02_Tool'];
      const hasAllRequiredFolders = requiredFolders.every(folder =>
        projectNodes.some(node => node.title === folder)
      );

      if (!hasAllRequiredFolders) {
        setError("필수 폴더가 누락되었습니다.");
        return;
      }

      const { error: nodesError } = await supabase
        .from("project_nodes")
        .insert(projectNodes);

      if (nodesError) {
        setError("프로젝트 노드 생성에 실패했습니다.");
        return;
      }

      // 3. 프로젝트 목록 업데이트
      const { data: updatedProjects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      if (updatedProjects) {
        setProjects(updatedProjects);
      }

      // 상태 초기화
      resetNewProjectState();

      // 생성된 프로젝트 ID로 워크스페이스로 이동
      router.push(`/project-workspace/${project.id}`);
    } catch {
      setError("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>새 프로젝트</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="font-bold text-gray-900">새 프로젝트 생성</DialogTitle>
            <DialogDescription className="text-gray-900">프로젝트 이름과 템플릿을 선택하세요.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-gray-900">
            <Input
              placeholder="프로젝트 이름 입력"
              value={newProjectState.projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div>
              <h3 className="font-bold mb-2 text-gray-900">템플릿 선택</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-900">
                {templates.map((temp) => (
                  <TemplateCard
                    key={temp.id}
                    icon={temp.icon}
                    title={temp.title}
                    description={temp.description}
                    selected={newProjectState.selectedTemplate === temp.id}
                    onSelect={() => setSelectedTemplate(temp.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-gray-900">태그 선택</h3>
              <div className="flex space-x-4">
                {["루틴", "몰입루프"].map(tag => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newProjectState.selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                    <span>{`#${tag}`}</span>
                  </label>
                ))}
              </div>
            </div>
            {newProjectState.error && (
              <p className="text-red-500 text-sm">{newProjectState.error}</p>
            )}
          </div>
          <DialogFooter>
            <Button 
              onClick={handleCreate}
              disabled={newProjectState.isLoading}
            >
              {newProjectState.isLoading ? "생성 중..." : "만들기"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}