'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/landing/Navigation'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Supabase 연동
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <motion.div
      initial= "hidden"
      whileInView= "visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* 네비게이션 바 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <motion.h1 
          initial= "hidden"
          whileInView= "visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-4"
          >
            문의하기
          </motion.h1>
          <p className="text-xl text-gray-600">MetaOS에 대해 궁금한 점이 있으신가요? 언제든지 문의해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <motion.div
            initial= "hidden"
            whileInView= "visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">연락처 정보</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">이메일</h3>
                  <p className="text-gray-600">contact@metaos.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">운영 시간</h3>
                  <p className="text-gray-600">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">자주 묻는 질문</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Q: MetaOS는 어떤 서비스인가요?</h3>
                  <p className="text-gray-600 mt-2">A: MetaOS는 AI 기반 프로젝트 관리 플랫폼으로, 사용자의 생각을 현실로 만들어주는 도구입니다.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Q: 무료 체험 기간이 있나요?</h3>
                  <p className="text-gray-600 mt-2">A: 네, 14일간의 무료 체험 기간을 제공합니다.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 문의 양식 */}
          <motion.div
            initial= "hidden"
            whileInView= "visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white  p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">문의 양식</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  메시지
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                문의 보내기
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 