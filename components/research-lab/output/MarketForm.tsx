'use client';

import React from 'react';

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

interface MarketFormProps {
  selectedTemplate: Template | null;
  selectedProduct: MarketProduct | null;
  onProductUpdate: (product: MarketProduct) => void;
}

const MarketForm: React.FC<MarketFormProps> = ({
  selectedProduct,
  onProductUpdate
}) => {
  const [title, setTitle] = React.useState(selectedProduct?.title || '');
  const [description, setDescription] = React.useState(selectedProduct?.description || '');
  const [price, setPrice] = React.useState(selectedProduct?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      onProductUpdate({
        ...selectedProduct,
        title,
        description,
        price
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-4">마켓 등록</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            제품명
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            가격
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default MarketForm; 