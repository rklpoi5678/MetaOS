// 필요한 라이브러리와 타입 임포트
import { create } from 'zustand'; // 전역 상태 관리를 위한 Zustand
import { persist } from 'zustand/middleware'; // 상태 영속성을 위한 미들웨어
import { User } from '@supabase/supabase-js'; // Supabase 사용자 타입
import { supabase } from '@/lib/supabaseClient'; // Supabase 클라이언트

// 노드(문서/프로젝트) 기본 구조 정의
export interface Node {
  id: string;
  title: string;
  content: string;
  type: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

// 프로젝트 상태 인터페이스
interface ProjectState {
  activeMode: 'normal' | 'focus'; // 현재 모드 (일반/집중)
  emotionState: 'focus_needed' | 'focused'; // 감정 상태
  currentStep: number; // 현재 단계
  totalSteps: number; // 전체 단계 수
}

// 에디터 상태 인터페이스
interface EditorState {
  __init: boolean;
  editorContent: string; // 에디터 내용
  activeStructure: 'mindmap' | 'flowchart'; // 활성화된 구조
  selectedTool: 'editor' | 'keyword'; // 선택된 도구
  isPreviewOpen: boolean; // 미리보기 열림 여부
  isSaving: boolean; // 저장 중 여부
  draggedItem: string | null; // 드래그 중인 아이템
}

// AI 프로젝트 노드 구조
interface AiProjectNode {
  type: 'folder' | 'file';
  title: string;
  content?: string;
  children?: AiProjectNode[];
}

// AI 응답 구조
interface AiProjectResponse {
  core: string;
  structure: string[];
  tool: string[];
  tree?: AiProjectNode[];
}

// 새 프로젝트 상태 인터페이스
interface NewProjectState {
  projectName: string;
  selectedTemplate: string;
  selectedTags: string[];
  isLoading: boolean;
  error: string | null;
}

// AI 프로젝트 상태 인터페이스
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

// 대시보드 상태 인터페이스
interface DashboardState {
  currentNode: Node | null;
  userName: string;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

// 전체 앱 상태 및 액션 인터페이스
interface AppState {
  // 상태 속성들
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

  // 액션 메서드들
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
  toggleProjectTag: (tag: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetNewProjectState: () => void;
  setUserInput: (input: string) => void;
  setSelectedProject: (project: string) => void;
  setAiCurrentStep: (step: 'ai' | 'manual') => void;
  setAiProjectName: (name: string) => void;
  setAiSelectedTemplate: (template: string) => void;
  setAiSelectedTags: (tags: string[]) => void;
  toggleAiProjectTag: (tag: string) => void;
  setAiIsLoading: (isLoading: boolean) => void;
  setAiResponse: (response: AiProjectResponse | null) => void;
  setAiProjectError: (error: string | null) => void;
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

// Zustand 스토어 생성
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 초기 상태 설정
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
        __init: false,
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

      // 상태 업데이트 액션들
      setUser: (u) => set({ user: u }),
      setNodes: (nodes) => set({ nodes }),
      setCurrentNode: (node) => set((state) => ({
        dashboardState: {
          ...state.dashboardState,
          currentNode: node
        }
      })),
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
        editorState: { ...state.editorState, editorContent: content, __init: true }
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
      toggleProjectTag: (tag) => set((state) => ({
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
      toggleAiProjectTag: (tag) => set((state) => ({
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
      setAiProjectError: (error) => set((state) => ({
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
      resetAppState: () => 
        set(() => ({
        user: null,
        nodes: [],
        currentNode: null,
        projectState: { activeMode: 'normal', emotionState: 'focus_needed', currentStep: 0, totalSteps: 5 },
        editorState: { editorContent: '', activeStructure: 'mindmap', selectedTool: 'editor', isPreviewOpen: false, isSaving: false, draggedItem: null, __init: true },
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
      // 영속성 설정
      name: 'app-storage', // 로컬 스토리지 키 이름
      partialize: (state) => ({ // 저장할 상태 선택
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
