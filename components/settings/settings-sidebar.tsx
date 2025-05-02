

interface SettingsSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {

  return (
    <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
                {[
                { key: 'profile', label: '프로필 설정' },
                { key: 'security', label: '보안 설정' },
                { key: 'notifications', label: '알림 설정' },
                { key: 'preferences', label: '환경 설정' },
            ].map(({ key, label }) => (
                <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === key ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
                >
                {label}
                </button>
            ))}
            </nav>
        </div>
    </div>
  )
}