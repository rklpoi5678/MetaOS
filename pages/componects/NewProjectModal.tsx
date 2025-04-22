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
  const [projectName, setProjectName] = React.useState("");
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const router = useRouter();

  const templates = [
    { id: "plr", icon: "📘", title: "PLR 마켓플레이스", description: "시장 분석 중심 템플릿" },
    { id: "emotion", icon: "🔥", title: "삐삐 감정루프", description: "감정 루프 기반의 작업 흐름" },
    { id: "empty", icon: "🌀", title: "빈 프로젝트", description: "빈 템플릿, 직접 구조 구성" },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(tags => tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
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
          status: "in_progress",        // 기본값
          template: selectedTemplate,
          tags: selectedTags,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("프로젝트 생성 오류", error);
      alert("프로젝트 생성에 실패했습니다.");
    } else {
      // 생성된 프로젝트 ID로 워크스페이스로 이동
      router.push(`/project-workspace?projectId=${data.id}`);
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
              value={projectName}
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
      </DialogPortal>
    </Dialog>
  );
}