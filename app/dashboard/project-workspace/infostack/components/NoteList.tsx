'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Note } from './InfoStack';

interface NoteListProps {
  notes: Note[];
  searchQuery: string;
  selectedTags: string[];
  selectedStructure: string;
  onUpdate: () => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes = [],
  searchQuery,
  selectedTags,
  selectedStructure,
}) => {
  const filteredNotes = React.useMemo(() => {
    if (!notes) return [];

    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => note.tags.includes(tag));
      const matchesStructure = note.structure === selectedStructure;
      
      return matchesSearch && matchesTags && matchesStructure;
    });
  }, [notes, searchQuery, selectedTags, selectedStructure]);

  if (!filteredNotes.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        노트가 없습니다. 새로운 노트를 생성해보세요.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotes.map((note, index) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h3 className="font-medium text-gray-800">{note.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{note.content}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <div className="text-sm text-gray-500">
              {new Date(note.created_at).toLocaleDateString()}
            </div>
            <span>{note.backlinks.length} 백링크</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NoteList; 