import fs from "fs";
import path from "path";
import { cache } from "react";
import { parse } from "yaml";

export interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  stack: string[];
  category: "product" | "client" | "experimental";
  featured: boolean;
  order: number;
  metrics?: Record<string, string>;
  challenges?: string[];
  solutions?: string[];
  learnings?: string[];
  images?: {
    hero?: string;
    gallery?: string[];
  };
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
}

export interface ProjectContent {
  metadata: ProjectMetadata;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

function getProjectFilePath(slug: string, locale?: string): string | null {
  if (locale) {
    const localePath = path.join(projectsDirectory, locale, `${slug}.mdx`);
    if (fs.existsSync(localePath)) return localePath;
  }
  const rootPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

// cache() dedupes repeated calls with the same args within a single render —
// every section on the homepage (SelectedWork, sitemap, etc.) reads the same
// slugs/files, so without this each one re-hits the filesystem separately.
export const getProjectSlugs = cache(function getProjectSlugs(locale?: string): string[] {
  const slugs = new Set<string>();

  // If locale is specified, prefer locale directory
  if (locale) {
    const localeDir = path.join(projectsDirectory, locale);
    if (fs.existsSync(localeDir)) {
      fs.readdirSync(localeDir)
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
      return Array.from(slugs);
    }
  }

  // Fall back to root directory
  if (fs.existsSync(projectsDirectory)) {
    fs.readdirSync(projectsDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(/\.mdx$/, "")));
  }

  return Array.from(slugs);
});

export const getProject = cache(function getProject(slug: string, locale?: string): ProjectContent | null {
  const filePath = getProjectFilePath(slug, locale);
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const frontmatterMatch = fileContents.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!frontmatterMatch) {
    throw new Error(`Missing or invalid project frontmatter: ${filePath}`);
  }
  const data: unknown = parse(frontmatterMatch[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Project frontmatter must be a YAML object: ${filePath}`);
  }
  const content = fileContents.slice(frontmatterMatch[0].length);

  return {
    metadata: {
      slug,
      ...data,
    } as ProjectMetadata,
    content,
  };
});

export function getAllProjects(locale?: string): ProjectMetadata[] {
  const slugs = getProjectSlugs(locale);
  const projects = slugs
    .map((slug) => getProject(slug, locale))
    .filter((p): p is ProjectContent => p !== null)
    .map((p) => p.metadata)
    .sort((a, b) => a.order - b.order);

  return projects;
}

export function getFeaturedProjects(locale?: string): ProjectMetadata[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

export function getProjectsByCategory(category: ProjectMetadata["category"], locale?: string): ProjectMetadata[] {
  return getAllProjects(locale).filter((p) => p.category === category);
}
