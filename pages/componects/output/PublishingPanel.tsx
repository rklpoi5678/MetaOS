'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

interface PublishingPanelProps {
  selectedProduct: MarketProduct | null;
  onStatusChange: (status: 'draft' | 'published' | 'archived') => void;
}

const PublishingPanel: React.FC<PublishingPanelProps> = ({
  selectedProduct,
  onStatusChange
}) => {
  const statuses = [
    { id: 'draft', name: '임시저장', color: 'bg-gray-100 text-gray-700' },
    { id: 'published', name: '공개', color: 'bg-green-100 text-green-700' },
    { id: 'archived', name: '보관', color: 'bg-yellow-100 text-yellow-700' },
  ] as const;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-4">발행 상태</h3>
      <div className="space-y-3">
        {statuses.map((status) => (
          <motion.button
            key={status.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStatusChange(status.id)}
            className={`
              w-full p-3 rounded-lg border flex items-center justify-between
              ${selectedProduct?.status === status.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className="font-medium text-gray-800">{status.name}</span>
            <span className={`px-2 py-1 rounded text-sm ${status.color}`}>
              {selectedProduct?.status === status.id ? '현재' : ''}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PublishingPanel; 