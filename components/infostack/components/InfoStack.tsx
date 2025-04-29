'use client';

import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import NoteList from './NoteList';
import TagFilter from './TagFilter';
import BacklinkViewer from './BacklinkViewer';
import StructureSelector from './StructureSelector';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAppStore } from '@/src/store/appStore';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  structure: string;
  backlinks: string[];
  created_at: string;
  updated_at: string;
  node_id: string;
  type: 'reference' | 'mention';
}

interface InfoStackProps {
  nodeId: string;
}

const InfoStack: React.FC<InfoStackProps> = ({ nodeId }) => {
  const [selectedStructure, setSelectedStructure] = React.useState('DIKI');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const { currentNode } = useAppStore();

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('node_id', nodeId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotes(notes || []);
    } catch (error) {
      console.error('노트 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [nodeId, router]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: note, error } = await supabase
        .from('notes')
        .insert([
          {
            title: '새 노트',
            content: '',
            tags: [],
            structure: selectedStructure,
            backlinks: [],
            node_id: nodeId,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => [note, ...prev]);
    } catch (error) {
      console.error('노트 생성 실패:', error);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => note.tags.includes(tag));
    const matchesStructure = selectedStructure === 'ALL' || note.structure === selectedStructure;
    
    return matchesSearch && matchesTags && matchesStructure;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              ← 뒤로가기
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentNode?.title || '정보 저장소'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCreateNote}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
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
              tags={Array.from(new Set(notes.flatMap(note => note.tags)))}
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <NoteList
                notes={filteredNotes}
                searchQuery={searchQuery}
                selectedTags={selectedTags}
                selectedStructure={selectedStructure}
                onUpdate={fetchNotes}
              />
            )}
          </div>

          {/* 오른쪽: 백링크 뷰어 */}
          <div className="col-span-3">
            <BacklinkViewer 
              backlinks={{
                nodeId: nodeId,
                notes: notes
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoStack; 