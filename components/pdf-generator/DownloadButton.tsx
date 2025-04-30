'use client'

import { usePdfStore } from '@/src/store/pdfStore';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

const DownloadButtonComponent = () => {
  const { pdfData } = usePdfStore();
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    
    setIsLoading(true);
    try {
      const element = contentRef.current;
      const opt = {
        margin: 10,
        filename: `${pdfData.name || 'document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF 생성 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleDownload}
        className={`px-4 py-2 rounded-md ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white`}
        disabled={isLoading}
      >
        {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
      </button>
    </div>
  );
};

export default DownloadButtonComponent;
