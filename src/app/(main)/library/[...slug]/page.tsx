import { Metadata } from "next";
import { redirect } from "next/navigation";
import LibraryPostContent from "@/components/LibraryPostContent";
import { OG_IMAGE } from "@/lib/config";
import { getNote, getAllNotePaths } from "@/lib/library";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const post = await getNote(params.slug);
  const fallback = decodeURIComponent(
    params.slug[params.slug.length - 1] ?? "Library",
  )
    .replace(".md", "")
    .replace(/-/g, " ");
  const title = post?.title ?? fallback;
  const description =
    typeof post?.description === "string" ? post.description : "";

  return {
    title: `${title} | Library`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [post, allNotes] = await Promise.all([
    getNote(params.slug),
    getAllNotePaths(),
  ]);

  if (!post) redirect("/library");

  return <LibraryPostContent post={post} allNotes={allNotes} />;
}
