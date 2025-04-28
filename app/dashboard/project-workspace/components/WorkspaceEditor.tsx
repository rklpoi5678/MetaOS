'use client'

import React, { useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/src/store/appStore";
import TiptapEditor from "@/app/dashboard/project-workspace/components/Workspace/TiptapEditor";
import ProjectDashboard from "@/app/dashboard/project-workspace/components/Workspace/ProjectDashboard";

interface WorkspaceEditorProps {
  nodeId: string;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ nodeId }) => {
  const { 
    nodes,
    currentNode, 
    setCurrentNode, 
    updateNode,
    editorState,
    setEditorContent,
    setIsSaving,
    activeTab
  } = useAppStore();

  const rootProjectNode = nodes.find(node => node.type === 'project');

  useEffect(() => {
    if (!nodeId) return;
    (async () => {
      const { data, error } = await supabase
        .from("nodes")
        .select("*")
        .eq("id", nodeId)
        .single();

      if (error) {
        console.error("노드 조회 오류:", error);
        return;
      }

      setCurrentNode(data);
      if (data.content) {
        setEditorContent(data.content);
      }
    })();
  }, [nodeId, setCurrentNode, setEditorContent]);

  const handleAutoSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("nodes")
        .update({ 
          content: editorState.editorContent,
          updated_at: new Date().toISOString()
        })
        .eq("id", nodeId);

      if (error) throw error;
      
      updateNode(nodeId, { 
        content: editorState.editorContent,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("자동 저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  }, [nodeId, editorState.editorContent, setIsSaving, updateNode]);

  // 자동 저장 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorState.editorContent) {
        handleAutoSave();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [editorState.editorContent, handleAutoSave]);

  if (!nodeId) {
    return <p>노드 ID를 불러오는 중...</p>;
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 space-y-6"
    >
      <AnimatePresence>
        {activeTab === 'info' ? (
          rootProjectNode ? (
            <ProjectDashboard nodeId={currentNode?.id || ''} />
          ) : (
            <div>프로젝트를 찾을 수 없습니다.</div>          
          )
        ) : (
          <TiptapEditor nodeId={currentNode?.id || ''} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkspaceEditor;