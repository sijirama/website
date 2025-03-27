"use client";
import React, { useEffect, useState } from "react";
import { getFileUrl } from "@/lib/library";
import { CONFIG } from "@/lib/config";
import axios from "axios";
import { manrope } from "@/lib/fonts";
import { Poppins } from "next/font/google";
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";
import { getPostContent } from "@/lib/getPostMetaData";
import { SidebarTrigger } from "@/components/ui/sidebar";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface PostData {
  title: string;
  content: string;
  [key: string]: any;
}

export default function BlogPage({ params }: { params: { slug: string[] } }) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const blobUrl = params.slug.join("/");
        const url = getFileUrl(blobUrl);
        const headers = {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
        };

        const response = await axios.get(url, { headers });
        const decodedContent = atob(response.data.content);
        const parsedPost = getPostContent(decodedContent);
        setPost({
          title: parsedPost.data.title,
          content: parsedPost.content,
          ...parsedPost.data,
        });
      } catch (err) {
        setError("Failed to fetch the post—something went wrong.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="w-8 h-8 border-3 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-orange-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 4a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z"
            />
          </svg>
          <p className="text-lg text-gray-700 font-medium">
            {error || "Post not found."}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Check back later or try a different slug.
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1
            className={`${poppinsFont.className} text-4xl md:text-5xl font-bold text-gray-900 leading-tight`}
          ></h1>
        </header>

        <div
          className={`flex-1 h-full w-full flex flex-col prose prose-stone ${manrope.className} max-w-none text-gray-700 leading-relaxed`}
        >
          <SidebarTrigger className="text-gray-700 hover:text-orange-500" />
          <Markdown
            options={{
              overrides: {
                pre: PreBlock,
                a: {
                  props: {
                    className:
                      "text-orange-400 hover:text-orange-500 transition-colors",
                  },
                },
                strong: {
                  props: {
                    className:
                      "bg-orange-100 px-1 rounded font-bold text-gray-800",
                  },
                },
                h1: {
                  props: {
                    className: `${poppinsFont.className} text-3xl font-bold text-gray-900 mt-8 mb-4`,
                  },
                },
                h2: {
                  props: {
                    className: `${poppinsFont.className} text-2xl font-semibold text-gray-800 mt-6 mb-3`,
                  },
                },
                h3: {
                  props: {
                    className: `${poppinsFont.className} text-xl font-medium text-gray-800 mt-5 mb-2`,
                  },
                },
                h4: {
                  props: {
                    className: `${poppinsFont.className} text-lg font-medium text-gray-700 mt-4 mb-2`,
                  },
                },
                h5: {
                  props: {
                    className: `${poppinsFont.className} text-base font-medium text-gray-700 mt-3 mb-1`,
                  },
                },
                h6: {
                  props: {
                    className: `${poppinsFont.className} text-sm font-medium text-gray-600 mt-3 mb-1`,
                  },
                },
              },
            }}
          >
            {post?.content}
          </Markdown>
        </div>
      </article>
    </div>
  );
}
