import { MyDate } from "@/lib/date";
import { manrope } from "@/lib/fonts";
import { PostMetaData } from "@/lib/getPostMetaData";
import Link from "next/link";
import React from "react";

interface Props {
  post: PostMetaData;
}

function PostCard({ post }: Props) {
  return (
    <Link href={`writing/${post.slug}`} className="w-full">
      <div
        className={`p-2 rounded-md my-2 hover:bg-zinc-900 text-zinc-200  transition-colors duration-300 ${manrope.className} `}
      >
        <h1 className="mb-1 font-semibold underline underline-offset-2">
          {post.title}
        </h1>
        <p className="tracking-tight font-light">{post.description}</p>
        <p className="text-xs font-light">{MyDate(post.date)}</p>
      </div>
    </Link>
  );
}

export default PostCard;
