

'use client'
import dynamic from 'next/dynamic';

const InputForm = dynamic(() => import('@/components/pdf-generator/InputForm'), { ssr: false });
const DownloadButton = dynamic(() => import('@/components/pdf-generator/DownloadButton'), { ssr: false });
const TemplatePreview = dynamic(() => import('@/components/pdf-generator/TemplatePreview'), { ssr: false });
const Navigation = dynamic(() => import('@/components/landing/Navigation'), { ssr: false });

export default function PdfGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <InputForm />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow">
              <TemplatePreview />
            </div>
            <div className="bg-white rounded-lg shadow">
              <DownloadButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
