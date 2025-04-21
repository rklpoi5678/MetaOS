// pages/project-workspace.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 좌측 사이드바: 프로젝트 폴더 목록
function WorkspaceSidebar() {
  const folders = ["00_개요", "01_실행구조", "02_설계문서", "03_기타"];
  return (
    <aside className="w-64 bg-gray-100 p-4 h-full">
      <ul>
        {folders.map((folder) => (
          <li
            key={folder}
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            {folder}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// 중앙 작업 공간: 선택된 폴더의 내용(여기서는 간단한 마크다운 뷰어 예제)
function WorkspaceEditor() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">문서 내용</h2>
      <div className="border rounded-md p-4 bg-white">
        <p>여기에 마크다운 뷰어나 에디터가 표시됩니다.</p>
      </div>
    </div>
  );
}

// 우측 보조 패널: 진행 상태, 태그, 최근 작업 등
function WorkspaceSidebarRight() {
  return (
    <aside className="w-64 bg-gray-50 p-4 h-full">
      <div>
        <h3 className="font-bold">진행 상태</h3>
        <p>진행률: 60%</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">관련 태그</h3>
        <div>
          <span className="mr-2 text-sm text-gray-600">#PLR</span>
          <span className="mr-2 text-sm text-gray-600">#감정루틴</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">최근 작업 항목</h3>
        <ul className="list-disc list-inside text-sm">
          <li>문서 업데이트: 개요</li>
          <li>폴더 구조 수정</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">마켓 등록 상태</h3>
        <p>미등록</p>
      </div>
      <div className="mt-4">
        <Button>보조 패널 접기/펼치기</Button>
      </div>
    </aside>
  );
}

export default function ProjectWorkspacePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">프로젝트 작업 공간</h1>
      </header>
      <div className="flex flex-1">
        <WorkspaceSidebar />
        <div className="flex-1 bg-gray-50">
          <WorkspaceEditor />
        </div>
        <WorkspaceSidebarRight />
      </div>
    </div>
  );
}
