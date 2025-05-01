'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type ActivityItem = {
  id: string
  title: string
  timestamp: string
  rootProjectId: string | null
}

export default function RecentWorkSidebar() {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    const fetchRecent = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id
      if (!userId) return

      const { data, error } = await supabase
        .from('nodes')
        .select('id, title, updated_at, type')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(3)

      if (error) {
        console.error('최근 작업 오류:', error)
        return
      }

      setActivities(data.map((item) => ({
        id: item.id,
        title: item.title,
        timestamp: item.updated_at,
        rootProjectId: item.type === 'project' ? item.id : null,
      })))
    }

    fetchRecent()
  }, [])

  if (activities.length === 0) {
    return <p className="text-xs text-gray-400 px-3">최근 작업이 없습니다.</p>
  }

  return (
    <ul className="space-y-1 px-2">
      {activities.map((item) => (
        <li key={item.id}>
          <Link href={`/dashboard/project-workspace/${item.id}?rootProjectId=${item.rootProjectId}`}>
            <div className="flex flex-col py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              <span className="truncate text-gray-600 text-xs">{item.title}</span>
              <span className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString('ko-KR', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
