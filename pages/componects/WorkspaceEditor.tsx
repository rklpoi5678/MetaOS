'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 중앙 작업 공간: 프로젝트 구조화된 작업 영역
function WorkspaceEditor() {
    const [activeStructure, setActiveStructure] = useState('mindmap');
    const [editorContent, setEditorContent] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState('editor');
    const [isSaving, setIsSaving] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);

    // 자동 저장 효과
    useEffect(() => {
      const timer = setTimeout(() => {
        if (editorContent) {
          handleAutoSave();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }, [editorContent]);

    const handleAutoSave = async () => {
      setIsSaving(true);
      // 자동 저장 로직 구현
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSaving(false);
    };

    const handleDragStart = (e: React.DragEvent<HTMLElement>, item: string) => {
      e.dataTransfer.setData('text/plain', item);
      setDraggedItem(item as unknown as null);
    };

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      if (draggedItem) {
        // 드래그 앤 드롭 로직 구현
        setDraggedItem(null);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 space-y-6"
      >
        {/* 프로젝트 제목 및 핵심 문장 - 편집 가능 */}
        <motion.div 
          className="border-b pb-4"
          whileHover={{ scale: 1.01 }}
        >
          <input 
            type="text"
            defaultValue="PLR 마켓플레이스"
            className="text-2xl font-bold mb-2 text-gray-900 w-full border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
          />
          <input
            type="text" 
            defaultValue="시장 분석을 통한 PLR 콘텐츠 최적화 프로젝트"
            className="text-lg text-gray-700 font-medium w-full border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
          />
        </motion.div>
  
        {/* Structure Selector - 토글 기능 */}
        <motion.div 
          className="flex gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.button 
            onClick={() => setActiveStructure('mindmap')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeStructure === 'mindmap' 
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            마인드맵 구조
          </motion.button>
          <motion.button 
            onClick={() => setActiveStructure('flowchart')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeStructure === 'flowchart'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            플로우 차트
          </motion.button>
        </motion.div>
  
        {/* Tool Interaction Zone - 도구 전환 */}
        <motion.div 
          className="border rounded-lg p-6 bg-white"
          whileHover={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">작업 도구</h3>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setSelectedTool('editor')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded ${
                  selectedTool === 'editor' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                에디터
              </motion.button>
              <motion.button
                onClick={() => setSelectedTool('keyword')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded ${
                  selectedTool === 'keyword' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                키워드
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`border p-4 rounded-md ${
                selectedTool === 'editor' ? 'shadow-lg scale-105' : 'hover:shadow-lg cursor-pointer opacity-75'
              }`}
              draggable
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, 'editor')}
            >
              <h4 className="font-medium text-gray-900">텍스트 에디터</h4>
              <textarea 
                className="w-full mt-2 p-2 border rounded text-gray-600 focus:ring-2 focus:ring-blue-300"
                placeholder="내용을 입력하세요..."
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
              />
              {isSaving && (
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
                selectedTool === 'keyword' ? 'shadow-lg scale-105' : 'hover:shadow-lg cursor-pointer opacity-75'
              }`}
              draggable
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, 'keyword')}
            >
              <h4 className="font-medium text-gray-900">키워드 분석</h4>
              <div className="mt-2 p-2 bg-gray-50 rounded text-gray-600 min-h-[100px]">
                <AnimatePresence>
                  {editorContent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="animate-fade-in"
                    >
                      키워드 분석 중... 
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity }}
                        className="loading-dots"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
  
        {/* Experiment Result / Preview */}
        <motion.div 
          className="bg-white rounded-lg p-6"
          animate={{ height: isPreviewOpen ? "auto" : "min-content" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">결과 미리보기</h3>
            <motion.button 
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-blue-500 hover:text-blue-700"
            >
              {isPreviewOpen ? '접기' : '펼치기'}
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-3 gap-4"
              >
                {['트래픽 분석', '키워드 성과', '경쟁사 분석'].map((title, index) => (
                  <motion.div 
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border p-3 rounded-md hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h5 className="font-medium text-gray-600">{title}</h5>
                    <div className="h-32 bg-gray-100 mt-2 rounded flex items-center justify-center text-gray-400 hover:bg-gray-200 cursor-pointer">
                      {title === '트래픽 분석' ? '차트 영역' : 
                       title === '키워드 성과' ? '데이터 테이블' : '비교 분석'}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
  
        {/* Archive / Save Controls */}
        <motion.div 
          className="flex justify-between items-center pt-4 border-t"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.button 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span>저장하기</span>
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isSaving ? 360 : 0 }}
              transition={{ duration: 1, repeat: isSaving ? Infinity : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </motion.svg>
            {showTooltip && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
                작업 내용을 저장합니다
              </div>
            )}
          </motion.button>
          <motion.button 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>작업 로그 기록</span>
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  export default WorkspaceEditor;