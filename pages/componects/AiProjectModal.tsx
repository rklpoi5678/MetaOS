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
  const [userInput, setUserInput] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<string>("");
  const [currentStep, setCurrentStep] = React.useState<"ai" | "manual">("ai");
  const [projectName, setProjectName] = React.useState("");
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState<{
    core: string;
    structure: string[];
    tool: string[];
  } | null>(null);
  const router = useRouter();

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

  const toggleTag = (tag: string) => {
    setSelectedTags(tags => tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
  };

  const handleAiSubmit = async () => {
    if (selectedProject === "continue" || !userInput.trim()) {
      setCurrentStep("manual");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `${selectedTemplate} 와 관련된 프로젝트를 시작하려고 해.(핵심 구조와 도구를 추천해줘)` })
      });

      const json = await response.json();
      const parsed = JSON.parse(json.choices[0].message.content);
      
      setAiResponse(parsed);
      console.log("AI 응답:", parsed);
      setCurrentStep("manual");
    } catch (error) {
      console.error("AI 응답 처리 중 오류:", error);
      alert("AI 응답 처리 중 오류가 발생했습니다. 다시 시도하거나 내용을 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      alert("로그인이 필요합니다.");
      return;
    }
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          user_id: user.id,
          title: projectName,
          status: "in_progress",
          template: selectedTemplate,
          tags: selectedTags,
          structure: aiResponse, // AI 응답 저장
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("프로젝트 생성 오류", error);
      alert("프로젝트 생성에 실패했습니다.");
    } else {
      router.push(`/project-workspace?projectId=${data.id}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>AI 프로젝트</Button>
      </DialogTrigger>
      
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        {currentStep === "ai" ? (
          <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="font-bold text-gray-900">AI 프로젝트 시작하기</DialogTitle>
              <DialogDescription className="text-gray-900">무엇을 하고 싶으신가요?</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <Input
                  placeholder="예: 글쓰기 루틴을 자동화하고 싶어, 어떠한 일을 실험하고 싶어 등"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full p-3 text-lg text-gray-900"
                  disabled={isLoading}
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
                      selected={selectedProject === type.id}
                      onSelect={() => {
                        setSelectedProject(type.id);
                        if (type.id === "continue") {
                          setCurrentStep("manual");
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
                disabled={isLoading}
              >
                {isLoading ? "처리중..." : "시작하기"}
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
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
                      selected={selectedTemplate === temp.id}
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
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      <span>{`#${tag}`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>만들기</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
}