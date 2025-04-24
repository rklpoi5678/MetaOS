'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ExportModal from './ExportModal';
import TemplateBuilder from './TemplateBuilder';
import MarketForm from './MarketForm';
import MarketplaceSelector from './MarketplaceSelector';
import PublishingPanel from './PublishingPanel';

interface Template {
  id: string;
  name: string;
  description: string;
  structure: string;
  format: 'pdf' | 'json' | 'markdown';
  createdAt: Date;
  updatedAt: Date;
}

interface MarketProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  platform: 'gumroad' | 'notion' | 'pdf';
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const OutputEngine: React.FC = () => {
  const [templates] = React.useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<MarketProduct | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Output Engine</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              내보내기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 왼쪽: 템플릿 빌더 */}
          <div className="col-span-4">
            <TemplateBuilder
              templates={templates}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
            />
          </div>

          {/* 중앙: 마켓폼 */}
          <div className="col-span-4">
            <MarketForm
              selectedTemplate={selectedTemplate}
              selectedProduct={selectedProduct}
              onProductUpdate={setSelectedProduct}
            />
          </div>

          {/* 오른쪽: 마켓플레이스 선택 및 발행 */}
          <div className="col-span-4 space-y-6">
            <MarketplaceSelector
              selectedProduct={selectedProduct}
              onPlatformSelect={(platform) => {
                if (selectedProduct) {
                  setSelectedProduct({ ...selectedProduct, platform });
                }
              }}
            />
            <PublishingPanel
              selectedProduct={selectedProduct}
              onStatusChange={(status) => {
                if (selectedProduct) {
                  setSelectedProduct({ ...selectedProduct, status });
                }
              }}
            />
          </div>
        </div>

        {/* 내보내기 모달 */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          selectedTemplate={selectedTemplate}
        />
      </motion.div>
    </div>
  );
};

export default OutputEngine; 