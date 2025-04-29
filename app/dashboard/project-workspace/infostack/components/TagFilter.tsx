'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  tags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedTags, onTagsChange }) => {
  const [availableTags] = React.useState<string[]>([
    '프로젝트', '아이디어', '참고자료', '회의록', '리서치'
  ]);

  const toggleTag = (tag: string) => {
    if (!selectedTags) return;
    
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-3">태그 필터</h3>
      <div className="space-y-2">
        {availableTags.map(tag => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleTag(tag)}
            className={`
              w-full px-3 py-2 rounded text-left text-sm
              ${selectedTags?.includes(tag)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-white text-gray-600 hover:bg-gray-100'}
            `}
          >
            #{tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter; 