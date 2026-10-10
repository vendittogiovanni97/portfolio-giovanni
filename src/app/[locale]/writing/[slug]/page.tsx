import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWritingPost, getWritingSlugs } from "@/lib/writing";
import { renderMarkdown } from "@/lib/markdown";
import { WritingPostLayout } from "@/components/writing/WritingPostLayout";
import { isLocale, type Locale } from "@/i18n/server";
import { localeAlternates } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const post = getWritingPost(slug, locale);
  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: localeAlternates(locale, `/writing/${post.metadata.slug}`),
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime: post.metadata.date,
      tags: post.metadata.tags,
    },
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const post = getWritingPost(slug, locale);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  return (
    <WritingPostLayout post={post.metadata} locale={locale}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </WritingPostLayout>
  );
}
