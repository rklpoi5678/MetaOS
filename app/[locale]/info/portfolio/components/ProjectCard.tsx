'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="relative h-48 w-full">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{project.summary}</p>
        </div>
      </Card>
    </motion.div>
  );
} 