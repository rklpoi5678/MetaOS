// components/AiProjectModal.tsx
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
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useAppStore } from "@/src/store/appStore";

// 프로젝트/템플릿 카드 컴포넌트
function Card({
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

export default function AiProjectModal({ className }: { className?: string }) {
  const router = useRouter();
  const { 
    aiProjectState,
    setUserInput,
    setSelectedProject,
    setAiCurrentStep,
    setAiProjectName,
    setAiSelectedTemplate,
    toggleAiTag,
    setAiIsLoading,
    setAiResponse,
    setAiError,
    resetAiProjectState,
    setProjects
  } = useAppStore();

  const projectTypes = [
    { 
      id: "new_project", 
      icon: "✨", 
      title: "새 프로젝트 생성", 
      description: "AI와 함께 새로운 프로젝트를 시작해보세요" 
    },
    { 
      id: "continue", 
      icon: "🔄", 
      title: "제가 해볼게요", 
      description: "수동으로 프로젝트를 진행합니다" 
    }
  ];

  const templates = [
    { id: "plr", icon: "📘", title: "PLR 마켓플레이스", description: "시장 분석 중심 템플릿" },
    { id: "emotion", icon: "🔥", title: "삐삐 감정루프", description: "감정 루프 기반의 작업 흐름" },
    { id: "empty", icon: "🌀", title: "빈 프로젝트", description: "빈 템플릿, 직접 구조 구성" },
  ];

  const handleAiSubmit = async () => {
    if (aiProjectState.selectedProject === "continue" || !aiProjectState.userInput.trim()) {
      setAiCurrentStep("manual");
      return;
    }

    setAiIsLoading(true);
    setAiError(null);

    try {
      const response = await fetch("/api/generate-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `${aiProjectState.selectedTemplate} 와 관련된 프로젝트를 시작하려고 해.(핵심 구조와 도구를 추천해줘)` 
        })
      });

      const json = await response.json();
      let parsed;
      try {
        // 응답이 이미 객체인 경우
        if (typeof json.choices[0].message.content === 'object') {
          parsed = json.choices[0].message.content;
        } else {
          // 문자열을 JSON으로 파싱 시도
          const content = json.choices[0].message.content
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // 제어 문자 제거
            .replace(/\n/g, '\\n') // 줄바꿈을 이스케이프
            .replace(/\r/g, '\\r') // 캐리지 리턴을 이스케이프
            .replace(/\t/g, '\\t'); // 탭을 이스케이프
          parsed = JSON.parse(content);
        }

        // API 응답 형식에 맞게 변환
        interface ProjectNode {
          title: string;
          children?: {
            title: string;
          }[];
        }

        const transformedResponse = {
          core: parsed[0]?.title || "프로젝트 핵심",
          structure: parsed.map((node: ProjectNode) => node.title),
          tool: parsed.flatMap((node: ProjectNode) => 
            node.children?.map((child) => child.title) || []
          ),
          tree: parsed // 원본 트리 구조 저장
        };

        setAiResponse(transformedResponse);
        setAiCurrentStep("manual");
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        throw new Error('AI 응답 형식이 올바르지 않습니다.');
      }
    } catch {
      setAiError("AI 응답 처리 중 오류가 발생했습니다. 다시 시도하거나 내용을 확인해주세요.");
    } finally {
      setAiIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setAiIsLoading(true);
    setAiError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setAiError("로그인이 필요합니다.");
        return;
      }

      // 1. 프로젝트 생성
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            user_id: user.id,
            title: aiProjectState.projectName,
            status: "in_progress",
            template: aiProjectState.selectedTemplate,
            tags: aiProjectState.selectedTags,
          },
        ])
        .select()
        .single();

      if (projectError) {
        setAiError("프로젝트 생성에 실패했습니다.");
        return;
      }

      // 2. 프로젝트 노드 생성
      let projectNodes = [];
      
      if (aiProjectState.selectedProject === "new_project" && aiProjectState.aiResponse?.tree) {
        // AI 모드: AI가 생성한 노드 구조 사용
        const allowedFolders = ['00_Core', '01_Structure', '02_Tool'];
        const tree = aiProjectState.aiResponse.tree;
        
        // 폴더 노드 필터링 및 변환
        const folderNodes = tree
          .filter((node: { type: string; title: string }) => node.type === 'folder' && allowedFolders.includes(node.title))
          .map((node: { type: string; title: string }, index: number) => ({
            project_id: project.id,
            type: 'folder',
            title: node.title,
            content: null,
            sort_order: index,
          }));

        // 파일 노드 변환
        interface TreeFolder {
          type: string;
          title: string;
          children?: TreeChild[];
        }

        interface TreeChild {
          type: string;
          title: string;
          content?: string;
        }

        interface FolderNode {
          title: string;
        }

        const fileNodes = tree.flatMap((folder: TreeFolder) => {
          if (folder.type === 'folder' && allowedFolders.includes(folder.title) && folder.children) {
            return folder.children
              .filter((child: TreeChild) => child.type === 'file')
              .map((child: TreeChild, index: number) => ({
                project_id: project.id,
                type: 'file',
                title: child.title,
                content: child.content || null,
                sort_order: folderNodes.findIndex((n: FolderNode) => n.title === folder.title) * 100 + index,
              }));
          }
          return [];
        });

        projectNodes = [...folderNodes, ...fileNodes];
      } else {
        // 수동 모드: 기본 노드 구조 생성
        projectNodes = [
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
      }

      // 필수 폴더가 모두 있는지 확인
      const requiredFolders = ['00_Core', '01_Structure', '02_Tool'];
      const hasAllRequiredFolders = requiredFolders.every(folder =>
        projectNodes.some(node => node.title === folder)
      );

      if (!hasAllRequiredFolders) {
        setAiError("필수 폴더가 누락되었습니다.");
        return;
      }

      const { error: nodesError } = await supabase
        .from("project_nodes")
        .insert(projectNodes);

      if (nodesError) {
        setAiError("프로젝트 노드 생성에 실패했습니다.");
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
      resetAiProjectState();

      // 생성된 프로젝트 ID로 워크스페이스로 이동
      router.push(`/project-workspace/${project.id}`);
    } catch {
      setAiError("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setAiIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>AI 프로젝트</Button>
      </DialogTrigger>
      
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        {aiProjectState.currentStep === "ai" ? (
          <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="font-bold text-gray-900">AI 프로젝트 시작하기</DialogTitle>
              <DialogDescription className="text-gray-900">무엇을 하고 싶으신가요?</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <Input
                  placeholder="예: 글쓰기 루틴을 자동화하고 싶어, 어떠한 일을 실험하고 싶어 등"
                  value={aiProjectState.userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-3 text-lg text-gray-900"
                  disabled={aiProjectState.isLoading}
                />
              </div>
              
              <div>
                <h3 className="font-bold mb-4 text-gray-900">프로젝트 유형 선택</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  {projectTypes.map((type) => (
                    <Card
                      key={type.id}
                      icon={type.icon}
                      title={type.title}
                      description={type.description}
                      selected={aiProjectState.selectedProject === type.id}
                      onSelect={() => {
                        setSelectedProject(type.id);
                        if (type.id === "continue") {
                          setAiCurrentStep("manual");
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button 
                onClick={handleAiSubmit} 
                className="w-full"
                disabled={aiProjectState.isLoading}
              >
                {aiProjectState.isLoading ? "처리중..." : "시작하기"}
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="font-bold text-gray-900">새 프로젝트 생성</DialogTitle>
              <DialogDescription className="text-gray-900">프로젝트 이름과 템플릿을 선택하세요.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4 text-gray-900">
              <Input
                placeholder="프로젝트 이름 입력"
                value={aiProjectState.projectName}
                onChange={(e) => setAiProjectName(e.target.value)}
              />
              <div>
                <h3 className="font-bold mb-2 text-gray-900">템플릿 선택</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-900">
                  {templates.map((temp) => (
                    <Card
                      key={temp.id}
                      icon={temp.icon}
                      title={temp.title}
                      description={temp.description}
                      selected={aiProjectState.selectedTemplate === temp.id}
                      onSelect={() => setAiSelectedTemplate(temp.id)}
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
                        checked={aiProjectState.selectedTags.includes(tag)}
                        onChange={() => toggleAiTag(tag)}
                      />
                      <span>{`#${tag}`}</span>
                    </label>
                  ))}
                </div>
              </div>
              {aiProjectState.error && (
                <p className="text-red-500 text-sm">{aiProjectState.error}</p>
              )}
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreate}
                disabled={aiProjectState.isLoading}
              >
                {aiProjectState.isLoading ? "생성 중..." : "만들기"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
}