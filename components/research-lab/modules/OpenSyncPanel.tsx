'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OpenSyncPanelProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface SyncConnection {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file' | 'stream';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync: string;
  config: Record<string, string>;
}

const OpenSyncPanel: React.FC<OpenSyncPanelProps> = ({ onEmotionChange }) => {
  const [connections, setConnections] = useState<SyncConnection[]>([]);
  const [currentConnection, setCurrentConnection] = useState<SyncConnection>({
    id: '',
    name: '',
    type: 'api',
    status: 'disconnected',
    lastSync: '',
    config: {}
  });
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  const handleAddConfig = () => {
    setCurrentConnection({
      ...currentConnection,
      config: { ...currentConnection.config, '': '' }
    });
  };

  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...currentConnection.config };
    if (value === '') {
      delete newConfig[key];
    } else {
      newConfig[key] = value;
    }
    setCurrentConnection({ ...currentConnection, config: newConfig });
  };

  const handleConnect = () => {
    if (!currentConnection.name) return;

    const newConnection: SyncConnection = {
      ...currentConnection,
      id: `conn-${Date.now()}`,
      status: 'connected',
      lastSync: new Date().toISOString()
    };

    setConnections([...connections, newConnection]);
    setCurrentConnection({
      id: '',
      name: '',
      type: 'api',
      status: 'disconnected',
      lastSync: '',
      config: {}
    });

    // 연결 성공 시 감정 상태 업데이트
    onEmotionChange({
      focus: 0.7,
      flow: 0.8,
      clarity: 0.9
    });

    // 동기화 로그 추가
    setSyncLogs(prev => [...prev, `[${new Date().toLocaleString()}] ${newConnection.name} 연결 성공`]);
  };

  const handleSync = (connectionId: string) => {
    setConnections(connections.map(conn => {
      if (conn.id === connectionId) {
        return { ...conn, status: 'syncing' };
      }
      return conn;
    }));

    // 동기화 시뮬레이션
    setTimeout(() => {
      setConnections(connections.map(conn => {
        if (conn.id === connectionId) {
          return {
            ...conn,
            status: 'connected',
            lastSync: new Date().toISOString()
          };
        }
        return conn;
      }));

      setSyncLogs(prev => [...prev, `[${new Date().toLocaleString()}] ${connections.find(c => c.id === connectionId)?.name} 동기화 완료`]);
    }, 2000);
  };

  const getStatusColor = (status: SyncConnection['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">🔄 오픈 동기화 패널</h2>
        <p className="text-gray-600 mt-2">
          외부 시스템과의 실시간 데이터 동기화를 관리합니다
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* 연결 설정 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연결 이름
            </label>
            <input
              type="text"
              value={currentConnection.name}
              onChange={(e) => setCurrentConnection({
                ...currentConnection,
                name: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연결 유형
            </label>
            <select
              value={currentConnection.type}
              onChange={(e) => setCurrentConnection({
                ...currentConnection,
                type: e.target.value as SyncConnection['type']
              })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="api">API</option>
              <option value="database">데이터베이스</option>
              <option value="file">파일</option>
              <option value="stream">스트림</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설정
            </label>
            <div className="space-y-2">
              {Object.entries(currentConnection.config).map(([key, value], index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleConfigChange(key, e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="키"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleConfigChange(key, e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="값"
                  />
                </div>
              ))}
              <button
                onClick={handleAddConfig}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 설정 추가
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConnect}
            disabled={!currentConnection.name}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            연결
          </motion.button>
        </div>

        {/* 연결 목록 및 로그 */}
        <div className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">활성 연결</h3>
            {connections.map((connection) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{connection.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {connection.type === 'api' ? 'API' :
                       connection.type === 'database' ? '데이터베이스' :
                       connection.type === 'file' ? '파일' : '스트림'} 연결
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(connection.status)}`}>
                      {connection.status === 'connected' ? '연결됨' :
                       connection.status === 'disconnected' ? '연결 끊김' :
                       connection.status === 'syncing' ? '동기화 중' : '오류'}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSync(connection.id)}
                      disabled={connection.status === 'syncing'}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm disabled:opacity-50"
                    >
                      동기화
                    </motion.button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">설정:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(connection.config).map(([key, value], index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    마지막 동기화: {connection.lastSync ? new Date(connection.lastSync).toLocaleString() : '없음'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-2">동기화 로그</h3>
            <div className="h-48 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-2">
              {syncLogs.map((log, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenSyncPanel; 