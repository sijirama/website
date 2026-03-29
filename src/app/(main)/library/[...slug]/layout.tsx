import type { Metadata } from "next";

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
      images: "https://media.sijibomi.com/blob/website/f5922f41614775aba49ba6c49f6ef36f.jpg",
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
