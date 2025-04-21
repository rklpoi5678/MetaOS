// components/NewProjectModal.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      className={`border p-4 rounded-md cursor-pointer ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="font-bold">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}

export default function NewProjectModal() {
  const [projectName, setProjectName] = React.useState("");
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");

  const templates = [
    {
      id: "plr",
      icon: "📘",
      title: "PLR 마켓플레이스",
      description: "시장 분석 중심 템플릿",
    },
    {
      id: "감정루프",
      icon: "🔥",
      title: "삐삐 감정루프",
      description: "감정 루프 기반의 작업 흐름",
    },
    {
      id: "empty",
      icon: "🌀",
      title: "빈 프로젝트",
      description: "빈 템플릿, 직접 구조 구성",
    },
  ];

  const handleCreate = () => {
    // 실제 로직에서는 자동 구조 생성 후 해당 작업 공간 페이지로 이동 처리
    alert(`프로젝트 생성: ${projectName}, 템플릿: ${selectedTemplate}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>새 프로젝트</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>새 프로젝트 생성</DialogTitle>
          <DialogDescription>
            프로젝트 이름과 템플릿을 선택하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="프로젝트 이름 입력"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div>
            <h3 className="font-bold mb-2">템플릿 선택</h3>
            <div className="grid grid-cols-2 gap-4">
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
            <h3 className="font-bold mb-2">태그 선택</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="루틴" />
                <span>#루틴</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" value="몰입루프" />
                <span>#몰입루프</span>
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>만들기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
