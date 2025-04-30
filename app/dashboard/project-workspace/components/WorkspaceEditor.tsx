'use client'

import React, { useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAppStore } from "@/src/store/appStore";
import TiptapEditor from "@/components/dashboard/projecct-workspace/TiptapEditor";
import ProjectDashboard from "@/components/dashboard/projecct-workspace/ProjectDashboard";

interface WorkspaceEditorProps {
  nodeId: string;
  rootProjectId: string | null;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ nodeId, rootProjectId }) => {
  const { 
    setCurrentNode, 
    updateNode,
    editorState,
    setEditorContent,
    setIsSaving,
    activeTab
  } = useAppStore();

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="p-4 space-y-6"
    >
      <motion.div variants={itemVariants}>
        {activeTab === 'info' && rootProjectId ? (
            <ProjectDashboard nodeId={rootProjectId} />
        ) : ( 
          <TiptapEditor nodeId={nodeId} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default WorkspaceEditor;