'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Note } from './InfoStack';

interface BacklinkViewerProps {
  backlinks: {
    nodeId: string;
    notes: Note[];
  };
}

const BacklinkViewer: React.FC<BacklinkViewerProps> = ({ backlinks }) => {
  const [selectedNote] = React.useState<string | null>(null);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-3">백링크</h3>
      {selectedNote ? (
        <div className="space-y-2">
          {backlinks.notes.map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-2 bg-white rounded border border-gray-200"
            >
              <div className="font-medium text-gray-800">{note.title}</div>
              <div className="text-xs text-gray-500">
                {note.type === 'reference' ? '참조' : '언급'}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          노트를 선택하면 관련 백링크가 표시됩니다
        </div>
      )}
    </div>
  );
};

export default BacklinkViewer; 