'use client'

type ActivityItem = {
  id: string;
  action: 'edit' | 'create' | 'delete';
  target: 'document' | 'folder' | 'project';
  targetTitle: string;
  timestamp: string;
}

function actionText(action: 'edit' | 'create' | 'delete') {
  switch (action) {
    case 'edit': return '수정';
    case 'create': return '생성';
    case 'delete': return '삭제';
  }
}

export default function Activity() {

  const activityList: ActivityItem[] = [
    {
      id: '1',
      action: 'edit',
      target: 'document',
      targetTitle: '기획서 초안',
      timestamp: '2025-04-30T08:20:00Z'
    },
    {
      id: '2',
      action: 'create',
      target: 'folder',
      targetTitle: '2025년 5월 자료',
      timestamp: '2025-04-29T20:15:00Z'
    },
    {
      id: '3',
      action: 'delete',
      target: 'document',
      targetTitle: '회의록 v1',
      timestamp: '2025-04-29T18:00:00Z'
    }
  ];

  return (
    <div>
      <h3 className="text-gray-500 text-xs uppercase font-semibold px-3 mb-2">
        작업 기록
      </h3>
      <ul className="space-y-1">
        {activityList.slice(0, 5).map((item) => (
          <li key={item.id}>
            <div className="flex items-start space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-xs">
              <span>
                {item.action === 'edit' && '✏️'}
                {item.action === 'create' && '🆕'}
                {item.action === 'delete' && '🗑️'}
              </span>
              <div className="flex flex-col overflow-hidden">
                <span className="text-gray-700 truncate">
                  <b className="text-blue-500">{item.targetTitle}</b> {actionText(item.action)}됨
                </span>
                <span className="text-[10px] text-gray-400 truncate">
                  {new Date(item.timestamp).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
