// pages/signup.js
'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log('가입 유저:', data.user);
  
    if (!error && data?.user) {
      setMessage('회원가입 성공! 확인 이메일을 확인하세요.');
    } else {
      setMessage(error?.message || '회원가입 중 오류가 발생했습니다.');
    }
  
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-2 text-gray-600">새로운 계정을 만들어보세요</p>
        </div>

        <Card className="p-6 relative">
          <Link href="/">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl leading-none border border-gray-300 rounded px-2 hover:border-gray-500"
              >
              &times;
            </motion.button>
          </Link>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-900 bg-white border-gray-300 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-900 bg-white border-gray-300 placeholder:text-gray-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? '처리 중...' : '회원가입'}
            </Button>
          </form>

          {message && (
            <div className={`mt-4 text-sm text-center ${
              message.includes('성공') ? 'text-green-600' : 'text-red-500'
            }`}>
              {message}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
