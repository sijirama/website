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
    description: "from my website shelf",
    openGraph: {
      title: name,
      description:
        name == "Home" ? "homepage of my shelf" : "read my writing guys",
      images:
        "https://i.pinimg.com/474x/f7/6e/c1/f76ec12821e613ef03bc78efb8bf3ef5.jpg",
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
