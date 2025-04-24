'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  description: string;
  structure: string;
  format: 'pdf' | 'json' | 'markdown';
  createdAt: Date;
  updatedAt: Date;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: Template | null;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate
}) => {
  const [exportFormat, setExportFormat] = React.useState<'pdf' | 'json' | 'markdown'>('pdf');

  const handleExport = () => {
    if (!selectedTemplate) {
      console.error('템플릿이 선택되지 않았습니다.');
      return;
    }

    // 템플릿 정보를 포함한 내보내기 로직
    const exportData = {
      template: selectedTemplate,
      format: exportFormat,
      timestamp: new Date().toISOString()
    };

    console.log('Exporting with data:', exportData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md z-10"
          >
            <h3 className="text-xl font-bold mb-4">내보내기</h3>
            <div className="space-y-4">
              {selectedTemplate && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800">{selectedTemplate.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내보내기 형식
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['pdf', 'json', 'markdown'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`
                        p-3 rounded-lg border text-center
                        ${exportFormat === format
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'}
                      `}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  취소
                </button>
                <button
                  onClick={handleExport}
                  disabled={!selectedTemplate}
                  className={`
                    px-4 py-2 rounded-md
                    ${selectedTemplate
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  내보내기
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal; 