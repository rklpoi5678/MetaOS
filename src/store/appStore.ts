import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface Node {
  id: string;
  title: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_id?: string;
}

interface ProjectState {
  activeMode: 'normal' | 'focus';
  emotionState: 'focus_needed' | 'focused';
  currentStep: number;
  totalSteps: number;
}

interface EditorState {
  editorContent: string;
  activeStructure: 'mindmap' | 'flowchart';
  selectedTool: 'editor' | 'keyword';
  isPreviewOpen: boolean;
  isSaving: boolean;
  draggedItem: string | null;
}

interface AiProjectNode {
  type: 'folder' | 'file';
  title: string;
  content?: string;
  children?: AiProjectNode[];
}

interface AiProjectResponse {
  core: string;
  structure: string[];
  tool: string[];
  tree?: AiProjectNode[];
}

interface NewProjectState {
  projectName: string;
  selectedTemplate: string;
  selectedTags: string[];
  isLoading: boolean;
  error: string | null;
}

interface AiProjectState {
  userInput: string;
  selectedProject: string;
  currentStep: 'ai' | 'manual';
  projectName: string;
  selectedTemplate: string;
  selectedTags: string[];
  isLoading: boolean;
  aiResponse: AiProjectResponse | null;
  error: string | null;
}

interface DashboardState {
  currentNode: Node | null;
  userName: string;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

interface AppState {
  user: User | null;
  nodes: Node[];
  currentNode: Node | null;
  projectState: ProjectState;
  editorState: EditorState;
  newProjectState: NewProjectState;
  aiProjectState: AiProjectState;
  dashboardState: DashboardState;
  isSidebarHovered: boolean;
  isAdmin: boolean;
  activeTab: 'info' | 'document' | 'project';
  setUser: (u: User | null) => void;
  setNodes: (nodes: Node[]) => void;
  setCurrentNode: (node: Node | null) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  addNode: (node: Node) => void;
  deleteNode: (nodeId: string) => void;
  setActiveMode: (mode: 'normal' | 'focus') => void;
  setEmotionState: (state: 'focus_needed' | 'focused') => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (steps: number) => void;
  setActiveStructure: (structure: 'mindmap' | 'flowchart') => void;
  setEditorContent: (content: string) => void;
  setIsPreviewOpen: (isOpen: boolean) => void;
  setSelectedTool: (tool: 'editor' | 'keyword') => void;
  setIsSaving: (isSaving: boolean) => void;
  setDraggedItem: (item: string | null) => void;
  setProjectName: (name: string) => void;
  setSelectedTemplate: (template: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetNewProjectState: () => void;
  setUserInput: (input: string) => void;
  setSelectedProject: (project: string) => void;
  setAiCurrentStep: (step: 'ai' | 'manual') => void;
  setAiProjectName: (name: string) => void;
  setAiSelectedTemplate: (template: string) => void;
  setAiSelectedTags: (tags: string[]) => void;
  toggleAiTag: (tag: string) => void;
  setAiIsLoading: (isLoading: boolean) => void;
  setAiResponse: (response: AiProjectResponse | null) => void;
  setAiError: (error: string | null) => void;
  resetAiProjectState: () => void;
  setUserName: (name: string) => void;
  setDashboardIsLoading: (isLoading: boolean) => void;
  setDashboardError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetDashboardState: () => void;
  setSidebarHovered: (hovered: boolean) => void;
  setAdmin: (isAdmin: boolean) => void;
  setActiveTab: (tab: 'info' | 'document') => void;
  handleLogout: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      nodes: [],
      currentNode: null,
      projectState: {
        activeMode: 'normal',
        emotionState: 'focus_needed',
        currentStep: 0,
        totalSteps: 5
      },
      editorState: {
        editorContent: '',
        activeStructure: 'mindmap',
        selectedTool: 'editor',
        isPreviewOpen: false,
        isSaving: false,
        draggedItem: null,
      },
      newProjectState: {
        projectName: '',
        selectedTemplate: '',
        selectedTags: [],
        isLoading: false,
        error: null
      },
      aiProjectState: {
        userInput: '',
        selectedProject: '',
        currentStep: 'ai',
        projectName: '',
        selectedTemplate: '',
        selectedTags: [],
        isLoading: false,
        aiResponse: null,
        error: null
      },
      dashboardState: {
        userName: '',
        isLoading: true,
        error: null,
        searchQuery: '',
        currentNode: null
      },
      isSidebarHovered: false,
      isAdmin: false,
      activeTab: 'info',
      setUser: (u) => set({ user: u }),
      setNodes: (nodes) => set({ nodes }),
      setCurrentNode: (node) => set({ currentNode: node }),
      updateNode: (nodeId, updates) => set((state) => ({
        nodes: state.nodes.map((n) => 
          n.id === nodeId ? { ...n, ...updates } : n
        ),
        currentNode: state.currentNode?.id === nodeId 
          ? { ...state.currentNode, ...updates }
          : state.currentNode
      })),
      addNode: (node) => set((state) => ({
        nodes: [...state.nodes, node]
      })),
      deleteNode: (nodeId) => set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== nodeId)
      })),
      setActiveMode: (mode) => set((state) => ({
        projectState: { ...state.projectState, activeMode: mode }
      })),
      setEmotionState: (state) => set((prevState) => ({
        projectState: { ...prevState.projectState, emotionState: state }
      })),
      setCurrentStep: (step) => set((state) => ({
        projectState: { ...state.projectState, currentStep: step }
      })),
      setTotalSteps: (steps) => set((state) => ({
        projectState: { ...state.projectState, totalSteps: steps }
      })),
      setActiveStructure: (structure) => set((state) => ({
        editorState: { ...state.editorState, activeStructure: structure }
      })),
      setEditorContent: (content) => set((state) => ({
        editorState: { ...state.editorState, editorContent: content }
      })),
      setIsPreviewOpen: (isOpen) => set((state) => ({
        editorState: { ...state.editorState, isPreviewOpen: isOpen }
      })),
      setSelectedTool: (tool) => set((state) => ({
        editorState: { ...state.editorState, selectedTool: tool }
      })),
      setIsSaving: (isSaving) => set((state) => ({
        editorState: { ...state.editorState, isSaving }
      })),
      setDraggedItem: (item) => set((state) => ({
        editorState: { ...state.editorState, draggedItem: item }
      })),
      setProjectName: (name) => set((state) => ({
        newProjectState: { ...state.newProjectState, projectName: name }
      })),
      setSelectedTemplate: (template) => set((state) => ({
        newProjectState: { ...state.newProjectState, selectedTemplate: template }
      })),
      setSelectedTags: (tags) => set((state) => ({
        newProjectState: { ...state.newProjectState, selectedTags: tags }
      })),
      toggleTag: (tag) => set((state) => ({
        newProjectState: {
          ...state.newProjectState,
          selectedTags: state.newProjectState.selectedTags.includes(tag)
            ? state.newProjectState.selectedTags.filter(t => t !== tag)
            : [...state.newProjectState.selectedTags, tag]
        }
      })),
      setIsLoading: (isLoading) => set((state) => ({
        newProjectState: { ...state.newProjectState, isLoading }
      })),
      setError: (error) => set((state) => ({
        newProjectState: { ...state.newProjectState, error }
      })),
      resetNewProjectState: () => set(() => ({
        newProjectState: {
          projectName: '',
          selectedTemplate: '',
          selectedTags: [],
          isLoading: false,
          error: null
        }
      })),
      setUserInput: (input) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, userInput: input }
      })),
      setSelectedProject: (project) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, selectedProject: project }
      })),
      setAiCurrentStep: (step) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, currentStep: step }
      })),
      setAiProjectName: (name) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, projectName: name }
      })),
      setAiSelectedTemplate: (template) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, selectedTemplate: template }
      })),
      setAiSelectedTags: (tags) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, selectedTags: tags }
      })),
      toggleAiTag: (tag) => set((state) => ({
        aiProjectState: {
          ...state.aiProjectState,
          selectedTags: state.aiProjectState.selectedTags.includes(tag)
            ? state.aiProjectState.selectedTags.filter(t => t !== tag)
            : [...state.aiProjectState.selectedTags, tag]
        }
      })),
      setAiIsLoading: (isLoading) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, isLoading }
      })),
      setAiResponse: (response) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, aiResponse: response }
      })),
      setAiError: (error) => set((state) => ({
        aiProjectState: { ...state.aiProjectState, error }
      })),
      resetAiProjectState: () => set(() => ({
        aiProjectState: {
          userInput: '',
          selectedProject: '',
          currentStep: 'ai',
          projectName: '',
          selectedTemplate: '',
          selectedTags: [],
          isLoading: false,
          aiResponse: null,
          error: null
        }
      })),
      setUserName: (name) => set((state) => ({
        dashboardState: { ...state.dashboardState, userName: name }
      })),
      setDashboardIsLoading: (isLoading) => set((state) => ({
        dashboardState: { ...state.dashboardState, isLoading }
      })),
      setDashboardError: (error) => set((state) => ({
        dashboardState: { ...state.dashboardState, error }
      })),
      setSearchQuery: (query) => set((state) => ({
        dashboardState: { ...state.dashboardState, searchQuery: query }
      })),
      resetDashboardState: () => set(() => ({
        dashboardState: {
          userName: '',
          isLoading: true,
          error: null,
          searchQuery: '',
          currentNode: null
        }
      })),
      setSidebarHovered: (hovered) => set({ isSidebarHovered: hovered }),
      setAdmin: (isAdmin) => set({ isAdmin }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      handleLogout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          localStorage.removeItem('isLoggedIn');
          if (error) throw error;
          set({ user: null });
        } catch (error) {
          console.error('로그아웃 오류:', error);
        }
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        user: state.user, 
        nodes: state.nodes,
        currentNode: state.currentNode,
        projectState: state.projectState,
        editorState: state.editorState,
        newProjectState: state.newProjectState,
        aiProjectState: state.aiProjectState,
        dashboardState: state.dashboardState,
        activeTab: state.activeTab
      }),
    }
  )
);
