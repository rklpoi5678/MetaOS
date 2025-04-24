'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Chart.js 등록
Chart.register(...registerables);

interface RightDockProps {
  emotionState: {
    focus: number;
    flow: number;
    clarity: number;
  };
}

const RightDock: React.FC<RightDockProps> = ({ emotionState }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 기존 차트가 있다면 제거
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['집중', '흐름', '명확성'],
            datasets: [
              {
                label: '감정 상태',
                data: [emotionState.focus, emotionState.flow, emotionState.clarity],
                fill: true,
                backgroundColor: 'rgba(66, 153, 225, 0.2)',
                borderColor: 'rgba(66, 153, 225, 0.8)',
                tension: 0.4
              }
            ]
          },
          options: {
            scales: {
              r: {
                min: 0,
                max: 1,
                ticks: {
                  stepSize: 0.2
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [emotionState]);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">감정 흐름</h3>
        <div className="mt-4 h-48">
          <canvas ref={chartRef} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">변환 도구</h3>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            구조 → Mermaid
          </button>
          <button className="w-full px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            사고 → Markdown
          </button>
          <button className="w-full px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            데이터 → JSON
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">에이전트 로그</h3>
        <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-auto">
          <div className="space-y-2 text-sm text-gray-600">
            <p>• 코어 생성 시작 [12:30:45]</p>
            <p>• 구조 분석 중... [12:31:02]</p>
            <p>• 피드백 루프 활성화 [12:31:15]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDock; 