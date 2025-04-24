'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ArchiveManagerProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: 'experiment' | 'research' | 'insight';
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

const ArchiveManager: React.FC<ArchiveManagerProps> = ({ onEmotionChange }) => {
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [currentArchive, setCurrentArchive] = useState<ArchiveItem>({
    id: '',
    title: '',
    description: '',
    category: 'experiment',
    tags: [],
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArchiveItem['category'] | 'all'>('all');

  const handleAddTag = () => {
    setCurrentArchive({
      ...currentArchive,
      tags: [...currentArchive.tags, '']
    });
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...currentArchive.tags];
    newTags[index] = value;
    setCurrentArchive({ ...currentArchive, tags: newTags });
  };

  const handleSaveArchive = () => {
    if (!currentArchive.title || !currentArchive.description) return;

    const newArchive: ArchiveItem = {
      ...currentArchive,
      id: `archive-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setArchives([...archives, newArchive]);
    setCurrentArchive({
      id: '',
      title: '',
      description: '',
      category: 'experiment',
      tags: [],
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // 아카이브 저장 시 감정 상태 업데이트
    onEmotionChange({
      focus: 0.8,
      flow: 0.7,
      clarity: 0.9
    });
  };

  const filteredArchives = archives.filter(archive => {
    const matchesSearch = archive.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         archive.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         archive.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || archive.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: ArchiveItem['category']) => {
    switch (category) {
      case 'experiment': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-green-100 text-green-800';
      case 'insight': return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">📚 아카이브 매니저</h2>
        <p className="text-gray-600 mt-2">
          연구 결과와 실험 데이터를 체계적으로 보관하고 관리합니다
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* 아카이브 입력 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={currentArchive.title}
              onChange={(e) => setCurrentArchive({
                ...currentArchive,
                title: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={currentArchive.description}
              onChange={(e) => setCurrentArchive({
                ...currentArchive,
                description: e.target.value
              })}
              className="w-full h-24 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={currentArchive.category}
              onChange={(e) => setCurrentArchive({
                ...currentArchive,
                category: e.target.value as ArchiveItem['category']
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="experiment">실험</option>
              <option value="research">연구</option>
              <option value="insight">통찰</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              태그
            </label>
            <div className="space-y-2">
              {currentArchive.tags.map((tag, index) => (
                <input
                  key={index}
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="태그 입력"
                />
              ))}
              <button
                onClick={handleAddTag}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 태그 추가
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용
            </label>
            <textarea
              value={currentArchive.content}
              onChange={(e) => setCurrentArchive({
                ...currentArchive,
                content: e.target.value
              })}
              className="w-full h-32 p-2 border rounded-lg"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveArchive}
            disabled={!currentArchive.title || !currentArchive.description}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            아카이브 저장
          </motion.button>
        </div>

        {/* 아카이브 목록 */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색..."
              className="flex-1 p-2 border rounded-lg"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ArchiveItem['category'] | 'all')}
              className="p-2 border rounded-lg"
            >
              <option value="all">전체</option>
              <option value="experiment">실험</option>
              <option value="research">연구</option>
              <option value="insight">통찰</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredArchives.map((archive) => (
              <motion.div
                key={archive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{archive.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{archive.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(archive.category)}`}>
                    {archive.category === 'experiment' ? '실험' :
                     archive.category === 'research' ? '연구' : '통찰'}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">태그:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {archive.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">내용:</span>
                    <p className="text-sm text-gray-600 mt-1">{archive.content}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    생성: {new Date(archive.createdAt).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveManager; 