'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const EMOTION_STATES = ['정적', '파열', '회복', '몰입'];

export default function MetaOSMistral() {
  const [userInput, setUserInput] = useState('');
  const [userState, setUserState] = useState('정적');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          userState,
          memorySummary: localStorage.getItem('lastSummary') || '',
        }),
      });

      const data = await response.json();
      setResult(data.result);
      localStorage.setItem('lastSummary', data.result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-2">🌀 MetaOS 감정 루프 시뮬레이터</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          당신의 감정 상태를 기반으로 실행을 설계합니다.
        </p>

        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">🗣️ 지금 너의 상태를 한 줄로 표현해줘</label>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="현재 상태를 입력하세요..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">🧭 감정 상태</label>
            <Select value={userState} onValueChange={setUserState}>
              <SelectTrigger>
                <SelectValue placeholder="감정 상태를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {EMOTION_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !userInput}
            className="w-full"
          >
            {isLoading ? '처리 중...' : '실행'}
          </Button>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <h2 className="text-xl font-semibold mb-2">🧠 응답 결과</h2>
            <Card className="p-4">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 