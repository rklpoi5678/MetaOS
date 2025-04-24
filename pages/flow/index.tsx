'use client';

import React from 'react';
import RoutineDashboard from '../componects/flow/RoutineDashboard';

export default function FlowPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Flow Tracker</h1>
          <p className="text-gray-600 mt-2">
            루틴을 설정하고 실행 상태를 추적하세요
          </p>
        </div>
        
        <RoutineDashboard />
      </div>
    </div>
  );
} 