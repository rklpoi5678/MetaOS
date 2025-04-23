"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 좌측 사이드바: 프로젝트 폴더 목록 
function WorkspaceSidebar() {
    const [selectedFolder, setSelectedFolder] = useState("");
    const [isHovered, setIsHovered] = useState("");
    
    const folders = [
      "00_코어",
      "01_구조", 
      "02_도구", 
      "03_실험",
      "04_보관",
      "05_버전",
      "06_공개"
    ];

    return (
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gray-100 p-4 h-screen"
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
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
                    flex items-center gap-2 text-gray-900
                    ${selectedFolder === folder ? 'bg-blue-100' : 'hover:bg-gray-200'}
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
    );
}

export default WorkspaceSidebar;