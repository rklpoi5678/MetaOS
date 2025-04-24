import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';

interface Project { 
  id: string; 
  title: string; 
  status: string; 
  created_at: string; 
  tags: string[];
  content?: string;
}

interface ProjectNode {
  id: string;
  project_id: string;
  type: string;
  title: string;
  parent_id?: string;
  sort_order: number;
}

interface ProjectState {
  activeMode: 'normal' | 'focus';
  emotionState: 'focus_needed' | 'focused';
  currentStep: number;
  totalSteps: number;
}

interface EditorState {
  activeStructure: 'mindmap' | 'flowchart';
  editorContent: string;
  isPreviewOpen: boolean;
  selectedTool: 'editor' | 'keyword';
  isSaving: boolean;
  showTooltip: boolean;
  draggedItem: string | null;
}

interface AiProjectNode {
  type: 'folder' | 'file';
  title: string,
  content?: string, // file인 경우에만 들어갈 마크다운 본문
  children?: AiProjectNode[]; //하위노드
}

interface AiProjectResponse {
  core: string;
  structure: string[];
  tool: string[];
  tree?: AiProjectNode[]; // <- 여기에 AI의 JSON트리를 넣어 둡니다.

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
  userName: string;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

interface AppState {
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  projectNodes: ProjectNode[];
  projectState: ProjectState;
  editorState: EditorState;
  newProjectState: NewProjectState;
  aiProjectState: AiProjectState;
  dashboardState: DashboardState;
  setUser: (u: User | null) => void;
  setProjects: (p: Project[]) => void;
  setCurrentProject: (p: Project | null) => void;
  setProjectNodes: (nodes: ProjectNode[]) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addProjectNode: (node: ProjectNode) => void;
  updateProjectNode: (id: string, updates: Partial<ProjectNode>) => void;
  deleteProjectNode: (id: string) => void;
  setActiveMode: (mode: 'normal' | 'focus') => void;
  setEmotionState: (state: 'focus_needed' | 'focused') => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (steps: number) => void;
  setActiveStructure: (structure: 'mindmap' | 'flowchart') => void;
  setEditorContent: (content: string) => void;
  setIsPreviewOpen: (isOpen: boolean) => void;
  setSelectedTool: (tool: 'editor' | 'keyword') => void;
  setIsSaving: (isSaving: boolean) => void;
  setShowTooltip: (show: boolean) => void;
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
  setAiResponse: (response: { core: string; structure: string[]; tool: string[]; } | null) => void;
  setAiError: (error: string | null) => void;
  resetAiProjectState: () => void;
  setUserName: (name: string) => void;
  setDashboardIsLoading: (isLoading: boolean) => void;
  setDashboardError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetDashboardState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      projects: [],
      currentProject: null,
      projectNodes: [],
      projectState: {
        activeMode: 'normal',
        emotionState: 'focus_needed',
        currentStep: 0,
        totalSteps: 5
      },
      editorState: {
        activeStructure: 'mindmap',
        editorContent: '',
        isPreviewOpen: false,
        selectedTool: 'editor',
        isSaving: false,
        showTooltip: false,
        draggedItem: null
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
        searchQuery: ''
      },
      setUser: (u) => set({ user: u }),
      setProjects: (p) => set({ projects: p }),
      setCurrentProject: (p) => set({ currentProject: p }),
      setProjectNodes: (nodes) => set({ projectNodes: nodes }),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => 
          p.id === id ? { ...p, ...updates } : p
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...updates }
          : state.currentProject
      })),
      addProjectNode: (node) => set((state) => ({
        projectNodes: [...state.projectNodes, node]
      })),
      updateProjectNode: (id, updates) => set((state) => ({
        projectNodes: state.projectNodes.map((node) =>
          node.id === id ? { ...node, ...updates } : node
        )
      })),
      deleteProjectNode: (id) => set((state) => ({
        projectNodes: state.projectNodes.filter((node) => node.id !== id)
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
      setShowTooltip: (show) => set((state) => ({
        editorState: { ...state.editorState, showTooltip: show }
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
          searchQuery: ''
        }
      })),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        user: state.user, 
        projects: state.projects,
        currentProject: state.currentProject,
        projectNodes: state.projectNodes,
        projectState: state.projectState,
        editorState: state.editorState,
        newProjectState: state.newProjectState,
        aiProjectState: state.aiProjectState,
        dashboardState: state.dashboardState
      }),
    }
  )
);
