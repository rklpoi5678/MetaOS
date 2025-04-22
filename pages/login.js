import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { useUserStore } from '@/pages/src/store/userStore';

export default function Login() {
  const setUser = useUserStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setUser(data.user);
      setMessage('로그인 성공!');
      router.push('/dashboard'); // 로그인 후 이동할 페이지
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            placeholder="이메일 입력" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            placeholder="비밀번호 입력" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '처리 중...' : '로그인'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
      <p style={{ marginTop: '1rem' }}>
        계정이 없으신가요?{' '}
        <button 
          onClick={() => router.push('/componects/signup')} 
          style={{
            background: 'none',
            border: 'none',
            color: '#0070f3',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
