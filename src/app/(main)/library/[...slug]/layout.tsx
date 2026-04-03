import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/config";

type Props = {
  params: { slug: string[] };
  //searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  let name = slug[slug.length - 1];
  name = decodeURI(name);
  name = name.slice(0, -3);

  return {
    title: name,
    description: "notes and thoughts on everything and nothing.",
    openGraph: {
      title: name,
      description: "notes and thoughts on everything and nothing.",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

export default function LibrarySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
