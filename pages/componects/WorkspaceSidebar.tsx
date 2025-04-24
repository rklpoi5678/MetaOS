"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface WorkspaceSidebarProps {
  projectId: string;
}

interface Node {
  type: string;
  id: string;
  title: string;
}

function WorkspaceSidebar({ projectId }: WorkspaceSidebarProps) {
    const router = useRouter()
    const [folders, setFolders] = useState<string[]>([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isHovered, setIsHovered] = useState("");
    
    useEffect(() => {
      if (!projectId) return;
      fetch(`/api/project_nodes/${projectId}`)
        .then(res => res.json())
        .then((response) => {
          const nodes = Array.isArray(response) ? response : response.nodes || [];
          // 예: nodes 중에서 폴더 타입만 걸러내기
          const folderTitles = nodes
            .filter((n: Node) => n.type === 'folder')
            .map((n: Node) => n.title);
          setFolders(folderTitles);
        })
        .catch(error => {
          console.error('폴더 데이터 가져오기 실패:', error);
          setFolders([]);
        });
    }, [projectId]);

      if (!router.isReady) return <p>프로젝트 로딩중 ...</p>
    return (
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gray-800 p-4 h-screen text-gray-100"
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-100"
          whileHover={{ scale: 1.05 }}
        >
          프로젝트 작업공간
        </motion.h1>

        <motion.div 
          className="mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ul className="space-y-1">
            <AnimatePresence>
              {folders.map((folder, index) => (
                <motion.li
                  key={folder}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedFolder(folder)}
                  onHoverStart={() => setIsHovered(folder)}
                  onHoverEnd={() => setIsHovered("")}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-2 cursor-pointer rounded-md
                    flex items-center gap-2 text-gray-100
                    ${selectedFolder === folder ? 'bg-gray-700' : 'hover:bg-gray-700'}
                    transition-all duration-200
                  `}
                >
                  <motion.div 
                    animate={{
                      scale: isHovered === folder ? 1.2 : 1,
                      backgroundColor: selectedFolder === folder ? "#3B82F6" : "#D1D5DB"
                    }}
                    className="w-3 h-3 rounded-full"
                  />
                  <span>{folder}</span>
                  
                  {selectedFolder === folder && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-1 h-6 bg-blue-500 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </motion.aside>
)}

export default WorkspaceSidebar;