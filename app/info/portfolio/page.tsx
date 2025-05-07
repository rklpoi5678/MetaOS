'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  tools: string[];
  links: { title: string; url: string }[];
  pdfUrl: string;
  learnings: string[];
}

const projects: Project[] = [
  {
    id: 'meta-os',
    title: 'MetaOS - AI 기반 프로젝트 관리 시스템',
    thumbnail: '/portfolio/meta-os.jpeg',
    summary: 'AI를 활용한 프로젝트 관리 및 자동화 시스템',
    tools: ['Next.js', 'Supabase', 'Zustand', 'OpenAI API', 'Mistral'],
    links: [
      { title: 'GitHub', url: 'https://github.com/rklpoi5678/meta-os' },
      { title: 'Demo', url: 'https://meta-os.vercel.app' }
    ],
    pdfUrl: '/documents/meta-os-documentation.pdf',
    learnings: [
      'AI와 프로젝트 관리의 통합 방법',
      '실시간 데이터 동기화 구현',
      '사용자 경험 최적화'
    ]
  },
  {
    id: 'guguFresh',
    title: '구구프래시 - 농산품 직거래 플랫폼',
    thumbnail: '/portfolio/guguFresh.jpeg',
    summary: '보바일 농산품 직거래 플랫폼',
    tools: ['Flutter', 'Firebase', 'FlutterFlow'],
    links: [
      { title: 'GitHub', url: 'https://github.com/rklpoi5678' },
      { title: 'Demo', url: 'https://gugufresh.flutterflow.app/' }
    ],
    pdfUrl: '/documents/meta-os-documentation.pdf',
    learnings: [
      '산지직송 신선한 농산물 소비 플랫폼',
      '농업자와 소비자의 연결 및 문제점발견',
      '하이브리드 웹앱'
    ]
  }
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overview 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl text-gray-600 font-bold mb-4">포트폴리오</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {"기술로 더 나은 세상을 만드는 것을 추구합니다"}
        </p>
      </motion.section>

      {/* 프로젝트 그리드 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </section>

      {/* 프로젝트 상세 다이얼로그 */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProject && (
            <ProjectDetail project={selectedProject} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
