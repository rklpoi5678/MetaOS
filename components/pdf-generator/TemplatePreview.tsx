'use client';

import { usePdfStore } from '@/src/store/pdfStore';
import PdfTemplate from './PdfTemplate';
import { useRef } from 'react';

const TemplatePreviewComponent = () => {
  const { pdfData } = usePdfStore();
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">PDF 미리보기</h2>
      <div 
        ref={previewRef}
        className="border rounded-lg p-4 bg-white shadow-sm min-h-[500px] overflow-auto"
      >
        {pdfData.name || pdfData.subject || pdfData.content ? (
          <PdfTemplate />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            입력된 내용이 없습니다. 폼을 작성해주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreviewComponent;

