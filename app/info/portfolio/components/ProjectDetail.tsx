'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Download } from 'lucide-react';
import Mermaid from '@/components/Mermaid';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  tools: string[];
  flowDiagram: string;
  links: { title: string; url: string }[];
  pdfUrl: string;
  learnings: string[];
}

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-6">
      <div className="relative h-64 w-full">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">사용 기술</h3>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <Badge key={tool} variant="secondary">
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">실행 흐름</h3>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <Mermaid chart={project.flowDiagram} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">관련 링크</h3>
        <div className="flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Button
              key={link.title}
              variant="outline"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {link.title}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">배운 점</h3>
        <ul className="list-disc list-inside space-y-1">
          {project.learnings.map((learning, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              {learning}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <Button asChild>
          <a href={project.pdfUrl} download>
            <Download className="w-4 h-4 mr-2" />
            PDF 문서 다운로드
          </a>
        </Button>
      </div>
    </div>
  );
} 