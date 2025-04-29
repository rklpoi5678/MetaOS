'use client';

import { usePdfStore } from '@/src/store/pdfStore';
import { forwardRef } from 'react';

const PdfTemplateComponent = forwardRef<HTMLDivElement>((_, ref) => {
  const { pdfData } = usePdfStore();

  return (
    <div ref={ref} className="p-8 bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">{pdfData.name}</h1>
      <h2 className="text-xl text-center mb-6">{pdfData.subject}</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">목차</h3>
        <ul className="list-decimal pl-6">
          {pdfData.outline.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      </div>

      <div className="prose max-w-none">
        {pdfData.content}
      </div>
    </div>
  );
});

PdfTemplateComponent.displayName = 'PdfTemplateComponent';

export default PdfTemplateComponent;
