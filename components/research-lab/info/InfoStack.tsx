'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NoteList from './NoteList';
import TagFilter from './TagFilter';
import BacklinkViewer from './BacklinkViewer';
import StructureSelector from './StructureSelector';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  structure: string;
  backlinks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const InfoStack: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = React.useState('DIKI');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notes] = React.useState<Note[]>([]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard">
            <h2 className="text-2xl font-bold text-gray-800">Meta-OS 정보 저장소</h2>
          </Link>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              + 새 노트
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 왼쪽 사이드바: 구조 선택 및 태그 필터 */}
          <div className="col-span-3 space-y-6">
            <StructureSelector
              selectedStructure={selectedStructure}
              onSelect={setSelectedStructure}
            />
            <TagFilter
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* 중앙: 노트 목록 */}
          <div className="col-span-6">
            <div className="mb-4">
              <input
                type="search"
                placeholder="노트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <NoteList
              notes={notes}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              selectedStructure={selectedStructure}
            />
          </div>

          {/* 오른쪽: 백링크 뷰어 */}
          <div className="col-span-3">
            <BacklinkViewer />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoStack; 