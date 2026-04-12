import { Metadata } from "next";
import LibraryPostContent from "@/components/LibraryPostContent";
import { CONFIG, OG_IMAGE } from "@/lib/config";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

// Fetch all note paths for random note feature
async function getAllNotePaths(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/sijirama/cerebrum/git/trees/master?recursive=1`,
      {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    }
    );

    if (!response.ok) return [];

    const data = await response.json();
    const notes: string[] = [];

    data.tree?.forEach((item: any) => {
      if (item.path.startsWith('Public/') && item.path.endsWith('.md') && item.type === 'blob') {
        // Remove Public/ prefix
        notes.push(item.path.replace(/^Public\//, ''));
      }
      // Also include root Home.md
      if (item.path === 'Home.md') {
        notes.push('Home.md');
      }
    });

    return notes;
  } catch (error) {
    console.error('Failed to fetch note paths:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const title = decodeURIComponent(params.slug[params.slug.length - 1]).replace(".md", "");
  const cleanTitle = title.replace(/-/g, ' ');

  return {
    title: `${cleanTitle} | Library`,
    openGraph: {
      title: `${cleanTitle}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({ params }: { params: { slug: string[] } }) {
  const allNotes = await getAllNotePaths();
  return <LibraryPostContent slug={params.slug} allNotes={allNotes} />;
}
