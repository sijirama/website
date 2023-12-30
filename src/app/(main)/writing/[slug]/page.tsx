import { getPostContent, getPostMetaData } from "@/lib/getPostMetaData";
import React from "react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

function page(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="min-h-screen w-full py-20 bg-white text-black">
      <main className=" w-[96%] md:w-2/3 lg:w-3/5 mx-auto">
        <div className="my-5">
          <Link
            href={"/writing"}
            className="p-2 rounded-lg text-black text-lg font-semibold -tracking-wider underline"
          >
            Go back!
          </Link>
        </div>

        <div className="w-full p-2 flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl -tracking-wider">
            {post.data.title}
          </h1>
          <p className="font-light text-sm">
            {">"}
            {post.data.date} / {post.data.readTime} min read
          </p>
        </div>

        <div className="text-start text-lg">
          <article className="prose prose-stone max-w-none mx-auto prose-pre:bg-black">
            <Markdown>{post.content}</Markdown>
          </article>
        </div>
      </main>
    </div>
  );
}

export default page;

export const generateStaticParams = async () => {
  const posts = getPostMetaData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};
