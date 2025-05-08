'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import SettingsSidebar from '@/components/settings/settings-sidebar'

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notificationEmail: true,
    notificationPush: true,
    language: 'ko',
    theme: 'light'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleProfileSave = async () => {
    try {
      const { name, email } = formData
      const { error } = await supabase.auth.updateUser({
        email,
        data: { name },
      })

      if (error) throw error
      alert('✅ 프로필이 저장되었습니다')
    } catch (err: unknown) {
      const error = err as { message: string }
      console.error('❌ 프로필 저장 오류:', error.message)
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleSecuritySave = async () => {
    const { newPassword, confirmPassword } = formData
    if (!newPassword || newPassword !== confirmPassword) {
      alert('❗ 비밀번호가 일치하지 않습니다.')
      return
    }
  
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
  
      if (error) throw error
      alert('✅ 비밀번호가 변경되었습니다.')

    } catch (e: unknown) {
      const error = e as { message: string }
      console.error('❌ 비밀번호 변경 오류:', error.message)
      alert('비밀번호 변경 실패')
    }
  }

  const handlePreferenceSave = async () => {
    try {
      const { language, theme } = formData
      const user = await supabase.auth.getUser()
      const { error } = await supabase
      .from('users_settings')
      .upsert({
        user_id: user.data.user?.id,
        language,
        theme,
        updated_at: new Date().toISOString(),
      },{ onConflict: 'user_id'})
  
      if (error) throw error
      alert('✅ 환경 설정이 저장되었습니다.')
    } catch (err: unknown) {
      const error = err as { message: string }
      console.error('❌ 환경 설정 저장 실패:', error.message)
      alert('환경 설정 저장 중 오류가 발생했습니다.')
    }
  }

  const handleNotificationSave = async () => {
    try {
      const { notificationEmail, notificationPush } = formData
      const user = await supabase.auth.getUser()
      const { error } = await supabase
      .from('notifications_settings')
      .upsert({
        user_id: user.data.user?.id,
        email_notifications: notificationEmail,
        push_notifications: notificationPush,
        updated_at: new Date().toISOString(),
      },{onConflict: 'user_id'})

      if (error) throw error
      alert('✅ 알림 설정이 저장되었습니다.')
    } catch (err: unknown) {
      const error = err as { message: string }
      console.error('❌ 알림 설정 저장 실패:', error.message)
      alert('알림 설정 저장 중 오류가 발생했습니다.')
    }
  }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-50"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">설정</h1>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 뒤로가기
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <SettingsSidebar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

            {/* 메인 컨텐츠 */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                  {activeTab === 'profile' && (
                    <div className="bg-white rounded-xl shadow-md p-8 space-y-8 border border-zinc-200">
                    <div className="pb-4 border-b border-zinc-200">
                      <h2 className="text-2xl font-bold text-zinc-900">프로필 설정</h2>
                      <p className="text-sm text-zinc-500 mt-1">회원님의 계정 정보를 수정할 수 있습니다.</p>
                    </div>
                  
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">이름</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border text-gray-600 border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                  
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">이메일</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border text-gray-600 border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                  
                      <div className="pt-2">
                        <button
                          onClick={handleProfileSave}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          저장하기
                        </button>
                      </div>
                    </div>
                  </div>
                  )}

                  {activeTab === 'security' && (
                    <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">보안 설정</h2>
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          현재 비밀번호
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border text-gray-600 border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          새 비밀번호
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border text-gray-600 border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          새 비밀번호 확인
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border text-gray-600 border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleSecuritySave}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          저장하기
                        </button>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'notifications' && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">알림 설정</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label htmlFor="notificationEmail" className="text-sm font-medium text-gray-700">
                            이메일 알림
                          </label>
                          <input
                            type="checkbox"
                            id="notificationEmail"
                            name="notificationEmail"
                            checked={formData.notificationEmail}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="notificationPush" className="text-sm font-medium text-gray-700">
                            푸시 알림
                          </label>
                          <input
                            type="checkbox"
                            id="notificationPush"
                            name="notificationPush"
                            checked={formData.notificationPush}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleNotificationSave}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        > 
                          저장하기
                        </button>
                      </div>
                    </>
                  )}

                  {activeTab === 'preferences' && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">환경 설정</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            언어
                          </label>
                          <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="ko">한국어</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                            테마
                          </label>
                          <select
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="light">라이트 모드</option>
                            <option value="dark">다크 모드</option>
                            <option value="system">시스템 설정</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handlePreferenceSave}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        > 
                          저장하기
                        </button>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
