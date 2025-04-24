'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  description: string;
  structure: string;
  format: 'pdf' | 'json' | 'markdown';
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateBuilderProps {
  templates?: Template[];
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  templates = [],
  selectedTemplate,
  onTemplateSelect
}) => {
  if (!templates.length) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-4">템플릿 빌더</h3>
        <div className="text-center py-8 text-gray-500">
          <p>템플릿이 없습니다.</p>
          <p className="text-sm mt-2">새로운 템플릿을 생성해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-4">템플릿 빌더</h3>
      <div className="space-y-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTemplateSelect(template)}
            className={`
              p-4 rounded-lg border cursor-pointer
              ${selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <h4 className="font-medium text-gray-800">{template.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                {template.format.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(template.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateBuilder; 