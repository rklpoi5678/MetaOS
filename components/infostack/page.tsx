'use client';

import InfoStack from '@/components/infostack/components/InfoStack';
import { useParams } from 'next/navigation';

export default function InfostackPage() {
  const params = useParams();
  const nodeId = params?.nodeId as string;
  return (
    <div className="min-h-screen bg-gray-100">
      <InfoStack nodeId={nodeId} />
    </div>
  );
} 