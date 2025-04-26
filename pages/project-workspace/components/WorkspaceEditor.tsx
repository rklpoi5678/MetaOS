'use client'

import React, { useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/src/store/appStore";

interface WorkspaceEditorProps {
  nodeId: string;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ nodeId }) => {
  const { 
    currentNode, 
    setCurrentNode, 
    updateNode,
    editorState,
    setActiveStructure,
    setEditorContent,
    setSelectedTool,
    setIsSaving,
    setDraggedItem,
    activeTab,
    projectState
  } = useAppStore();

  useEffect(() => {
    if (!nodeId) return;
    (async () => {
      const { data, error } = await supabase
        .from("nodes")
        .select("id, title, type, content, parent_id, created_at,updated_at, user_id")
        .eq("id", nodeId)
        .single();

      if (error) {
        console.error("노드 조회 오류:", error);
        return;
      }

      setCurrentNode(data);
      if (data.content) {
        setEditorContent(data.content);
      }
    })();
  }, [nodeId, setCurrentNode, setEditorContent]);

  const handleAutoSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("nodes")
        .update({ 
          content: editorState.editorContent,
          updated_at: new Date().toISOString()
        })
        .eq("id", nodeId);

      if (error) throw error;
      
      updateNode(nodeId, { 
        content: editorState.editorContent,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("자동 저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  }, [nodeId, editorState.editorContent, setIsSaving, updateNode]);

  // 자동 저장 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorState.editorContent) {
        handleAutoSave();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [editorState.editorContent, handleAutoSave]);

  const handleDragStart = (e: React.DragEvent<HTMLElement>, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggedItem(item);
  };


  if (!nodeId) {
    return <p>노드 ID를 불러오는 중...</p>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 space-y-6"
    >
      <AnimatePresence>
        {activeTab === 'info' ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* 프로젝트 정보 대시보드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 프로젝트 개요 카드 */}
              <motion.div 
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">프로젝트 개요</h3>
                  <span className="text-blue-500">📊</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">제목</span>
                    <span className="font-medium text-gray-600">{currentNode?.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">생성일</span>
                    <span className="font-medium text-gray-600">{new Date(currentNode?.created_at || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">마지막 수정</span>
                    <span className="font-medium text-gray-600">{new Date(currentNode?.updated_at || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* 작업 상태 카드 */}
              <motion.div 
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
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

            {/* Structure Selector */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
              whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">구조 선택</h3>
              <div className="flex gap-4">
                <motion.button 
                  onTap={() => setActiveStructure('mindmap')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    editorState.activeStructure === 'mindmap' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  <span className="text-xl">🧠</span>
                  <span>마인드맵 구조</span>
                </motion.button>
                <motion.button 
                  onTap={() => setActiveStructure('flowchart')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    editorState.activeStructure === 'flowchart'
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                  }`}
                >
                  <span className="text-xl">📊</span>
                  <span>플로우 차트</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="document"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* 문서 내용 표시 */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">문서 내용</h3>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setSelectedTool('editor')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded ${
                      editorState.selectedTool === 'editor' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    에디터
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedTool('keyword')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded ${
                      editorState.selectedTool === 'keyword' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    키워드
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border p-4 rounded-md ${
                    editorState.selectedTool === 'editor' ? 'shadow-lg scale-105' : 'hover:shadow-lg cursor-pointer opacity-75'
                  }`}
                  draggable
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, 'editor')}
                >
                  <h4 className="font-medium text-gray-900">텍스트 에디터</h4>
                  <textarea 
                    className="w-full mt-2 p-2 border rounded text-gray-600 focus:ring-2 focus:ring-blue-300"
                    placeholder="내용을 입력하세요..."
                    value={editorState.editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                  />
                  {editorState.isSaving && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 mt-2"
                    >
                      자동 저장 중...
                    </motion.div>
                  )}
                </div>
                <div 
                  className={`border p-4 rounded-md ${
                    editorState.selectedTool === 'keyword' ? 'shadow-lg scale-105' : 'hover:shadow-lg cursor-pointer opacity-75'
                  }`}
                  draggable
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, 'keyword')}
                >
                  <h4 className="font-medium text-gray-900">키워드 분석</h4>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-gray-600 min-h-[100px]">
                    <AnimatePresence>
                      {editorState.editorContent && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="animate-fade-in"
                        >
                          키워드 분석 중... 
                          <motion.div 
                            animate={{ scale: 1.2 }}
                            transition={{ 
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 0.5
                            }}
                            className="loading-dots"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkspaceEditor;