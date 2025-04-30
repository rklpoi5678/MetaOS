'use client'

import { motion } from 'framer-motion'
import { useAppStore } from "@/src/store/appStore"

interface ProjectDashboardProps {
  nodeId: string;
}


export default function ProjectDashboard({ nodeId }: ProjectDashboardProps) {
  const { 
    nodes,
    editorState,
    projectState,
  } = useAppStore();

  return (          
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6 z-0"
    >
      {/* 프로젝트 정보 대시보드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 프로젝트 개요 카드 */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">프로젝트 개요</h3>
            <span className="text-blue-500">📊</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">제목</span>
              <span className="font-medium text-gray-600">{nodes.find(node => node.id === nodeId)?.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">생성일</span>
              <span className="font-medium text-gray-600">{new Date(nodes.find(node => node.id === nodeId)?.created_at || '').toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">마지막 수정</span>
              <span className="font-medium text-gray-600">{new Date(nodes.find(node => node.id === nodeId)?.updated_at || '').toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* 작업 상태 카드 */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">작업 상태</h3>
            <span className="text-green-500">📈</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">현재 구조</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                editorState.activeStructure === 'mindmap' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {editorState.activeStructure === 'mindmap' ? '마인드맵' : '플로우차트'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">활성 도구</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                editorState.selectedTool === 'editor' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {editorState.selectedTool === 'editor' ? '에디터' : '키워드'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">저장 상태</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                editorState.isSaving 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {editorState.isSaving ? '저장 중...' : '저장됨'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 진행 상황 카드 */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">진행 상황</h3>
            <span className="text-purple-500">📊</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">전체 진행률</span>
                <span className="text-gray-600">{Math.round((projectState.currentStep / projectState.totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${(projectState.currentStep / projectState.totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  projectState.emotionState === 'focused' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                <span className="text-sm text-gray-600">
                  {projectState.emotionState === 'focused' ? '집중 모드' : '집중 필요'}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  projectState.activeMode === 'focus' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></span>
                <span className="text-sm text-gray-600">
                  {projectState.activeMode === 'focus' ? '포커스 모드' : '일반 모드'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Structure Display */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
        whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">문서 구조</h3>
        <div className="flex gap-4">
          <div className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            editorState.activeStructure === 'mindmap' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <span className="text-xl">🧠</span>
            <span>마인드맵 구조</span>
          </div>
          <div className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            editorState.activeStructure === 'flowchart'
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <span className="text-xl">📊</span>
            <span>플로우 차트</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 