'use client'
import React from "react";
import { useAppStore } from "@/src/store/appStore";
// 우측 보조 패널: 프로젝트 상태 및 도구 제어
function WorkspaceSidebarRight() {
  const { 
    projectState, 
    setActiveMode, 
    setEmotionState,
  } = useAppStore();

  return (
    <aside className="w-64 bg-gray-50 p-4 h-full">
      <div className="border-b pb-3 hover:bg-gray-100 transition-colors rounded p-2">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          🎯 Core 상태
          <span className="animate-pulse text-green-500 text-sm">•활성</span>
        </h3>
        <button 
          onClick={() => setActiveMode(projectState.activeMode === 'normal' ? 'focus' : 'normal')}
          className="mt-2 px-3 py-1 bg-blue-100 rounded text-sm text-gray-600 hover:bg-blue-200"
        >
          {projectState.activeMode === 'normal' ? '집중 모드' : '일반 모드'}
        </button>
      </div>

      <div className="border-b py-3 hover:bg-gray-100 transition-colors rounded p-2">
        <h3 className="font-bold text-gray-900">🔄 현재 Structure</h3>
        <div className="relative mt-1">
          <div className="absolute w-full h-2 bg-blue-100 rounded"></div>
          <div 
            className="absolute h-2 bg-blue-500 rounded animate-pulse"
            style={{ width: `${(projectState.currentStep / projectState.totalSteps) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm bg-blue-50 p-2 rounded mt-3 text-gray-600">
          실험 루틴 진행중 ({projectState.currentStep}/{projectState.totalSteps} 단계)
        </p>
      </div>

      <div className="border-b py-3 hover:bg-gray-100 transition-colors rounded p-2">
        <h3 className="font-bold text-gray-900">🛠 Quick Tools</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <button className="px-3 py-1 bg-green-100 rounded text-sm text-gray-600 hover:bg-green-200 hover:scale-105 transition-all">GPT</button>
          <button className="px-3 py-1 bg-blue-100 rounded text-sm text-gray-600 hover:bg-blue-200 hover:scale-105 transition-all">카드생성</button>
          <button className="px-3 py-1 bg-purple-100 rounded text-sm text-gray-600 hover:bg-purple-200 hover:scale-105 transition-all">Prompt</button>
          <button className="px-3 py-1 bg-yellow-100 rounded text-sm text-gray-600 hover:bg-yellow-200 hover:scale-105 transition-all">+추가</button>
        </div>
      </div>

      <div className="border-b py-3 hover:bg-gray-100 transition-colors rounded p-2">
        <h3 className="font-bold text-gray-900">💬 감정 상태</h3>
        <div className="flex flex-col gap-2 mt-2">
          <div className={`flex items-center justify-between p-2 rounded ${
            projectState.emotionState === 'focus_needed' ? 'bg-yellow-50' : 'bg-green-50'
          }`}>
            <span className="text-gray-600">
              {projectState.emotionState === 'focus_needed' ? '😩 집중이 필요해요' : '🎯 집중 모드'}
            </span>
            <button 
              onClick={() => setEmotionState(projectState.emotionState === 'focus_needed' ? 'focused' : 'focus_needed')}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              {projectState.emotionState === 'focus_needed' ? '몰입 모드 켜기' : '모드 해제'}
            </button>
          </div>
        </div>
      </div>

      <div className="py-3 hover:bg-gray-100 transition-colors rounded p-2">
        <h3 className="font-bold text-gray-900">💡 다음 액션 제안</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded cursor-pointer hover:bg-blue-100 transition-colors">
            키워드 분석 후 감정 맵핑을 시도해보세요
          </p>
          <p className="text-sm text-gray-600 bg-purple-50 p-2 rounded cursor-pointer hover:bg-purple-100 transition-colors">
            AI 기반 콘텐츠 최적화 실행
          </p>
        </div>
      </div>

    </aside>
  );
}
export default WorkspaceSidebarRight;