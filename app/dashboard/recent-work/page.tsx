'use client'

import Link from 'next/link'

export default function RecentWork() {

  const recentNodes = [
    {
      id: 'abc123',
      title: '기획서 초안',
      type: 'doc',
      updated_at: '2025-04-29T12:10:00Z',
      rootProjectId: 'project1',
    },
    {
      id: 'def456',
      title: '회의록_2025-04',
      type: 'doc',
      updated_at: '2025-04-29T11:45:00Z',
      rootProjectId: 'project1',
    },
  ];

return (
    <div>
    <h3 className="text-gray-500 text-xs uppercase font-semibold px-3 mb-2">
        최근 작업
    </h3>
        <ul className="space-y-1">
            {recentNodes.map((item) => (
            <li key={item.id}>
                <Link href={`/dashboard/project-workspace/${item.id}?rootProjectId=${item.rootProjectId}`}>
                <div className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm cursor-pointer">
                    <span>{item.type === 'folder' ? '📁' : '📄'}</span>
                    <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-medium text-gray-800">{item.title}</span>
                    <span className="text-xs text-gray-400 truncate">
                        {new Date(item.updated_at).toLocaleString('ko-KR', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                    </span>
                    </div>
                </div>
                </Link>
            </li>
            ))}
        </ul>
    </div>
    )
}