import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { getAllWritingPosts } from "@/lib/writing";
import { config } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.siteUrl;
  const projects = getAllProjects();

  const languages = (path: string) => ({
    languages: {
      it: `${baseUrl}${path}`,
      en: `${baseUrl}/en${path}`,
    },
  });

  const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/studio", changeFrequency: "monthly", priority: 0.8 },
    { path: "/writing", changeFrequency: "weekly", priority: 0.8 },
    { path: "/lab", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, changeFrequency, priority }) => [
    { url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency, priority, alternates: languages(path) },
    { url: `${baseUrl}/en${path}`, lastModified: new Date(), changeFrequency, priority, alternates: languages(path) },
  ]);

  const projectPages: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const path = `/work/${project.slug}`;
    const priority = project.featured ? 0.9 : 0.7;
    return [
      { url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority, alternates: languages(path) },
      { url: `${baseUrl}/en${path}`, lastModified: new Date(), changeFrequency: "monthly", priority, alternates: languages(path) },
    ];
  });

  const writingPages: MetadataRoute.Sitemap = (["it", "en"] as const).flatMap((locale) =>
    getAllWritingPosts(locale).map((post) => {
      const path = `/writing/${post.metadata.slug}`;
      return {
        url: `${locale === "en" ? `${baseUrl}/en` : baseUrl}${path}`,
        lastModified: new Date(post.metadata.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: languages(path),
      };
    })
  );

  return [...staticPages, ...projectPages, ...writingPages];
}
