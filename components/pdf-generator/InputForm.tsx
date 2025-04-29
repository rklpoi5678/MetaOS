'use client';

import { usePdfStore } from '@/src/store/pdfStore';
import { useState } from 'react';

const InputFormComponent = () => {
  const { setPdfData } = usePdfStore();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    outline: [''],
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOutlineChange = (index: number, value: string) => {
    const newOutline = [...formData.outline];
    newOutline[index] = value;
    setFormData(prev => ({ ...prev, outline: newOutline }));
  };

  const addOutlineItem = () => {
    setFormData(prev => ({ ...prev, outline: [...prev.outline, ''] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPdfData(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">이름</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">주제</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">목차</label>
        {formData.outline.map((item, index) => (
          <input
            key={index}
            type="text"
            value={item}
            onChange={(e) => handleOutlineChange(index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        ))}
        <button
          type="button"
          onClick={addOutlineItem}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + 목차 항목 추가
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">내용</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        저장
      </button>
    </form>
  );
};

export default InputFormComponent;
