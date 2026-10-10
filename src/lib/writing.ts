import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import type { Locale } from "@/i18n/server";

export interface WritingMetadata {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  readingTime: string;
}

export interface WritingPost {
  metadata: WritingMetadata;
  content: string;
}

const writingDirectory = path.join(process.cwd(), "src/content/writing");

function findPostFile(slug: string, locale?: Locale): string | null {
  const directories = locale
    ? [path.join(writingDirectory, locale), writingDirectory]
    : [writingDirectory];

  for (const directory of directories) {
    if (!fs.existsSync(directory)) continue;
    const filename = fs.readdirSync(directory).find(
      (entry) => entry.endsWith(".mdx") && entry.slice(0, -4).toLowerCase() === slug.toLowerCase()
    );
    if (filename) return path.join(directory, filename);
  }

  return null;
}

export const getWritingSlugs = cache(function getWritingSlugs(locale?: Locale): string[] {
  const slugs = new Set<string>();
  const directories = locale
    ? [path.join(writingDirectory, locale), writingDirectory]
    : [writingDirectory];

  for (const directory of directories) {
    if (!fs.existsSync(directory)) continue;
    for (const filename of fs.readdirSync(directory)) {
      if (filename.endsWith(".mdx")) slugs.add(filename.slice(0, -4).toLowerCase());
    }
  }

  return [...slugs];
});

export const getWritingPost = cache(function getWritingPost(slug: string, locale?: Locale): WritingPost | null {
  const filePath = findPostFile(slug, locale);
  if (!filePath) return null;

  const file = fs.readFileSync(/* turbopackIgnore: true */ filePath, "utf8");
  const frontmatter = file.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`Missing writing frontmatter: ${filePath}`);

  const data: unknown = parse(frontmatter[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Writing frontmatter must be a YAML object: ${filePath}`);
  }

  const rawMetadata = data as Record<string, unknown>;
  const date = rawMetadata.date instanceof Date
    ? rawMetadata.date.toISOString().slice(0, 10)
    : String(rawMetadata.date ?? "");

  return {
    metadata: { ...rawMetadata, date, slug } as WritingMetadata,
    content: file.slice(frontmatter[0].length),
  };
});

export function getAllWritingPosts(locale?: Locale): WritingPost[] {
  return getWritingSlugs(locale)
    .map((slug) => getWritingPost(slug, locale))
    .filter((post): post is WritingPost => post !== null)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}
