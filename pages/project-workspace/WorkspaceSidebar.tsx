"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useAppStore } from "@/src/store/appStore";
import { supabase } from "@/lib/supabaseClient";

interface WorkspaceSidebarProps {
  nodeId: string;
}

function WorkspaceSidebar({ nodeId }: WorkspaceSidebarProps) {
    const router = useRouter();
    const { nodes, setNodes } = useAppStore();
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isHovered, setIsHovered] = useState("");
    
    useEffect(() => {
      if (!nodeId) return;
      (async () => {
        const { data, error } = await supabase
          .from("nodes")
          .select("*")
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)

        if (error) {
          console.error("프로젝트 노드 조회 오류:", error);
          return;
        }

        setNodes(data);
      })();
    }, [nodeId, setNodes]);

    if (!router.isReady) return <p>프로젝트 로딩중 ...2</p>;

    const folders = nodes.filter(node => node.type === 'folder');

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
                  key={folder.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedFolder(folder.id)}
                  onHoverStart={() => setIsHovered(folder.id)}
                  onHoverEnd={() => setIsHovered("")}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-2 cursor-pointer rounded-md
                    flex flex-col gap-2 text-gray-100
                    ${selectedFolder === folder.id ? 'bg-gray-700' : 'hover:bg-gray-700'}
                    transition-all duration-200
                  `}
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{
                        scale: isHovered === folder.id ? 1.2 : 1,
                        backgroundColor: selectedFolder === folder.id ? "#3B82F6" : "#D1D5DB"
                      }}
                      className="w-3 h-3 rounded-full"
                    />
                    <span>{folder.title}</span>
                    
                    {selectedFolder === folder.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-2 w-1 h-6 bg-blue-500 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>

                  {selectedFolder === folder.id && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 space-y-1"
                    >
                      {nodes
                        .filter(node => node.type === 'file' && node.parent_id === folder.id)
                        .map((file, fileIndex) => (
                          <motion.li
                            key={file.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: fileIndex * 0.05 }}
                            className="p-2 cursor-pointer text-gray-300 hover:text-gray-100 hover:bg-gray-700 rounded-md flex items-center gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-400" />
                            <span>{file.title}</span>
                          </motion.li>
                        ))}
                    </motion.ul>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      </motion.aside>
    );
}

export default WorkspaceSidebar;