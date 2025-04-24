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

interface MarketplaceSelectorProps {
  selectedProduct: MarketProduct | null;
  onPlatformSelect: (platform: 'gumroad' | 'notion' | 'pdf') => void;
}

const platforms = [
  { id: 'gumroad', name: 'Gumroad', icon: '🛍️' },
  { id: 'notion', name: 'Notion', icon: '��' },
  { id: 'pdf', name: 'PDF', icon: '📄' },
] as const;

const MarketplaceSelector: React.FC<MarketplaceSelectorProps> = ({
  selectedProduct,
  onPlatformSelect
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-4">판매 플랫폼</h3>
      <div className="space-y-3">
        {platforms.map((platform) => (
          <motion.button
            key={platform.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPlatformSelect(platform.id)}
            className={`
              w-full p-3 rounded-lg border flex items-center gap-3
              ${selectedProduct?.platform === platform.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className="text-xl">{platform.icon}</span>
            <span className="font-medium text-gray-800">{platform.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceSelector; 