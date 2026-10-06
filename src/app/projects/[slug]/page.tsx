import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Project Not Found — Shlok Rajput',
    };
  }

  return {
    title: `${project.title} — Case Study | Shlok Rajput`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study | Shlok Rajput`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
