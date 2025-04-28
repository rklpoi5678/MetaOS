"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppStore } from "@/src/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface DocNode {
  type: "doc";
  title: string;
  content: string;
}

interface FolderNode {
  type: "folder";
  title: string;
  children: DocNode[];
}

interface ProjectNode {
  type: "project";
  title: string;
  content: string | null;
  children: FolderNode[];
}

// 템플릿 카드 컴포넌트
const TemplateCard = ({
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
}) => {
  return (
    <Card
      onClick={onSelect}
      className={`p-4 cursor-pointer transition-all duration-200 ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } hover:shadow-lg`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold mb-1">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </Card>
  );
};

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState<"type" | "details">("type");
  const [projectType, setProjectType] = useState<"ai" | "manual">("manual");
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setNodes } = useAppStore();

  const handleNext = () => {
    if (step === "type") {
      if (projectType === "ai") {
        setStep("details");
      } else {
        handleManualCreate();
      }
    } else {
      handleAiCreate();
    }
  };

  const handleAiCreate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError("로그인이 필요합니다.");
        return;
      }

      // AI 프로젝트 구조 생성
      const aiResponse = await fetch("/api/generate-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: projectName, // 프로젝트 이름을 프롬프트로 사용
        }),
      });

      if (!aiResponse.ok) {
        throw new Error("AI 생성에 실패했습니다.");
      }

      const result = await aiResponse.json();
      console.log("미스트랄 API 응답:", result);

      // 미스트랄 API 응답에서 구조 추출 및 파싱
      let structure;
      try {
        const content = result.choices[0].message.content;
        console.log("원본 응답:", content);

        // JSON 구조 추출 시도
        let jsonContent;
        try {
          // 정규식으로 JSON 배열 부분 추출
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          if (!jsonMatch) {
            throw new Error("JSON 구조를 찾을 수 없습니다.");
          }
          
          // 줄바꿈을 공백으로 대체
          const cleanedJson = jsonMatch[0].replace(/\n/g, ' ');
          jsonContent = JSON.parse(cleanedJson);
        } catch (e) {
          console.error("JSON 파싱 실패:", e);
          throw new Error("프로젝트 구조 파싱에 실패했습니다.");
        }

        // 구조 검증 및 변환
        if (!Array.isArray(jsonContent)) {
          throw new Error("유효하지 않은 프로젝트 구조입니다.");
        }

        structure = jsonContent.map((item: Partial<ProjectNode>): ProjectNode => ({
          type: "project",
          title: item.title || "새 프로젝트",
          content: item.type === "project" ? item.content || "새로 생성된 프로젝트입니다." : null,
          children: (item.children || []).map((folder: Partial<FolderNode>): FolderNode | null => {
            if (folder.type === "folder") {
              return {
                type: "folder",
                title: folder.title || "새 폴더",
                children: (folder.children || []).map((doc: Partial<DocNode>): DocNode => ({
                  type: "doc",
                  title: doc.title || "새 문서",
                  content: doc.content || ""
                }))
              };
            }
            return null;
          }).filter((folder): folder is FolderNode => folder !== null)
        }));

        console.log("최종 구조:", structure);
      } catch (parseError) {
        console.error("구조 파싱 에러:", parseError);
        throw new Error("프로젝트 구조 파싱에 실패했습니다.");
      }

      if (!structure || !Array.isArray(structure)) {
        throw new Error("유효하지 않은 프로젝트 구조입니다.");
      }

      // 1. 루트 노드(프로젝트) 생성
      const { data: rootNode, error: rootNodeError } = await supabase
        .from("nodes")
        .insert([
          {
            user_id: user.id,
            title: projectName,
            type: "project",
            content: structure[0].content,
            parent_id: null,
          },
        ])
        .select()
        .single();

      if (rootNodeError) {
        console.error("루트 노드 생성 에러:", rootNodeError);
        setError("루트 노드 생성에 실패했습니다.");
        return;
      }

      // 2. 폴더 노드 생성
      const folderNodes = structure[0].children.map((folder: FolderNode) => ({
        user_id: user.id,
        parent_id: rootNode.id,
        title: folder.title,
        type: "folder" as const,
        content: null
      }));

      if (folderNodes.length > 0) {
        const { data: createdFolders, error: folderError } = await supabase
          .from("nodes")
          .insert(folderNodes)
          .select();

        if (folderError) {
          console.error("폴더 노드 생성 에러:", folderError);
          setError("폴더 노드 생성에 실패했습니다.");
          return;
        }

        // 3. 문서 노드 생성
        const docNodes = structure[0].children.flatMap((folder: FolderNode, index: number) => {
          const parentFolder = createdFolders?.[index];
          if (!parentFolder) return [];

          return folder.children.map((doc: DocNode) => ({
            user_id: user.id,
            parent_id: parentFolder.id,
            title: doc.title,
            type: "doc" as const,
            content: doc.content
          }));
        });

        if (docNodes.length > 0) {
          const { error: docError } = await supabase
            .from("nodes")
            .insert(docNodes);

          if (docError) {
            console.error("문서 노드 생성 에러:", docError);
            setError("문서 노드 생성에 실패했습니다.");
            return;
          }
        }
      }

      // 4. 프로젝트 목록 업데이트
      const { data: updatedNodes } = await supabase
        .from("nodes")
        .select("*")
        .eq("user_id", user.id);

      if (updatedNodes) {
        setNodes(updatedNodes);
      }

      // 생성된 프로젝트 ID로 워크스페이스로 이동
      router.push(`/dashboard/project-workspace/${rootNode.id}`);
    } catch (err) {
      console.error("프로젝트 생성 에러:", err);
      setError("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualCreate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setError("로그인이 필요합니다.");
        return;
      }

      // 1. 루트 노드(프로젝트) 생성
      const { data: rootNode, error: rootNodeError } = await supabase
        .from("nodes")
        .insert([
          {
            user_id: user.id,
            title: "새 프로젝트",
            type: "project",
            content: "새로 생성된 프로젝트입니다.",
            parent_id: null,
          },
        ])
        .select()
        .single();

      if (rootNodeError) {
        console.error("루트 노드 생성 에러:", rootNodeError);
        setError("루트 노드 생성에 실패했습니다.");
        return;
      }

      // 2. 기본 코어 노드 생성
      const { error: coreNodeError } = await supabase
        .from("nodes")
        .insert([
          {
            user_id: user.id,
            parent_id: rootNode.id,
            title: "00_Core",
            type: "doc",
            content: "# 코어\n프로젝트의 핵심 개념과 목표를 작성하세요."
          }
        ]);

      if (coreNodeError) {
        console.error("코어 노드 생성 에러:", coreNodeError);
        setError("코어 노드 생성에 실패했습니다.");
        return;
      }

      // 3. 프로젝트 목록 업데이트
      const { data: updatedNodes } = await supabase
        .from("nodes")
        .select("*")
        .eq("user_id", user.id);

      if (updatedNodes) {
        setNodes(updatedNodes);
      }

      // 생성된 프로젝트 ID로 워크스페이스로 이동
      router.push(`/project-workspace/${rootNode.id}`);
    } catch (err) {
      console.error("프로젝트 생성 에러:", err);
      setError("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {step === "type" ? "새 프로젝트 시작하기" : "프로젝트 세부 정보"}
          </h1>
          <p className="mt-2 text-gray-600">
            {step === "type"
              ? "어떤 방식으로 프로젝트를 시작하시겠습니까?"
              : "AI가 생성할 프로젝트의 이름을 입력해주세요."}
          </p>
        </div>

        {step === "type" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <TemplateCard
                icon="🤖"
                title="AI 생성"
                description="AI가 프로젝트 구조를 자동으로 생성합니다"
                selected={projectType === "ai"}
                onSelect={() => setProjectType("ai")}
              />
              <TemplateCard
                icon="✍️"
                title="수동 생성"
                description="직접 프로젝트 구조를 구성합니다"
                selected={projectType === "manual"}
                onSelect={() => setProjectType("manual")}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                대시보드로 돌아가기
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? "처리 중..." : "다음"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                프로젝트 이름
              </label>
              <Input className="w-full text-gray-900 bg-white border-gray-300 placeholder:text-gray-500"
                placeholder="프로젝트 이름을 입력하세요"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep("type")}
                disabled={isLoading}
              >
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading || !projectName}
              >
                {isLoading ? "생성 중..." : "프로젝트 생성"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 