"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getFileUrl } from "@/lib/library";
import { CONFIG } from "@/lib/config";
import axios from "axios";
import { sourceSerif, dmSans } from "@/lib/fonts";
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";
import { getPostContent } from "@/lib/getPostMetaData";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Share2, Check, Shuffle, ArrowRight } from "lucide-react";
import { decodeBase64 } from "@/lib/utils";

interface PostData {
    title: string;
    content: string;
    [key: string]: any;
}

// Drop cap component for first paragraph
function DropCapParagraph({ children, ...props }: any) {
    const text = String(children);
    if (text.length === 0) return <p {...props}>{children}</p>;

    const firstLetter = text.charAt(0);
    const rest = text.slice(1);

    return (
        <p {...props}>
            <span className="float-left text-5xl font-bold leading-none mr-2 mt-1 text-pink-500">
                {firstLetter}
            </span>
            {rest}
        </p>
    );
}

export default function LibraryPostContent({ slug, allNotes }: { slug: string[]; allNotes?: string[] }) {
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isFirstParagraph, setIsFirstParagraph] = useState(true);
    const router = useRouter();

    // Share button handler
    const handleShare = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Random note handler
    const handleRandomNote = useCallback(() => {
        if (allNotes && allNotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allNotes.length);
            const randomNote = allNotes[randomIndex];
            router.push(`/library/${randomNote}`);
        }
    }, [allNotes, router]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + Shift + R for random note
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'r') {
                e.preventDefault();
                handleRandomNote();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleRandomNote]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let blobUrl = slug.join("/");
                if (slug.length > 0 && !blobUrl.endsWith(".md")) {
                    blobUrl = `${blobUrl}/index.md`;
                } else if (slug.length === 0) {
                    blobUrl = "Home.md";
                }

                const url = getFileUrl(blobUrl);
                const headers = {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${CONFIG.GITHUB_TOKEN}`,
                };

                const response = await axios.get(url, { headers });

                if (Array.isArray(response.data)) {
                    const indexFile = response.data.find((f: any) => f.name === "index.md");
                    if (indexFile) {
                        const indexResponse = await axios.get(indexFile.url, { headers });
                        const decodedContent = decodeBase64(indexResponse.data.content);
                        const parsedPost = getPostContent(decodedContent);
                        const firstH1Match = parsedPost.content.match(/^#\s+(.+)$/m);
                        const contentTitle = firstH1Match ? firstH1Match[1] : null;
                        const cleanContent = firstH1Match
                            ? parsedPost.content.replace(/^#\s+.+$/m, '').trim()
                            : parsedPost.content;
                        setPost({
                            title: parsedPost.data.title || contentTitle || "Untitled",
                            content: cleanContent,
                            ...parsedPost.data,
                        });
                    } else {
                        router.push("/library/Home.md");
                    }
                } else {
                    const decodedContent = decodeBase64(response.data.content);
                    const parsedPost = getPostContent(decodedContent);
                    const firstH1Match = parsedPost.content.match(/^#\s+(.+)$/m);
                    const contentTitle = firstH1Match ? firstH1Match[1] : null;
                    const cleanContent = firstH1Match
                        ? parsedPost.content.replace(/^#\s+.+$/m, '').trim()
                        : parsedPost.content;
                    setPost({
                        title: parsedPost.data.title || contentTitle || "Untitled",
                        content: cleanContent,
                        ...parsedPost.data,
                    });
                }
            } catch (err) {
                console.error(err);
                router.push("/library/Home.md");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="w-5 h-5 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) return null;

    // Track first paragraph for drop cap
    let paragraphCount = 0;

    return (
        <div className={`${dmSans.className} p-4 md:p-6 bg-zinc-50 min-h-screen`}>
            <article className="max-w-3xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <SidebarTrigger className="text-zinc-400 hover:text-pink-500 transition-colors" />

                        <div className="flex items-center gap-2">
                            {/* Random Note Button */}
                            <button
                                onClick={handleRandomNote}
                                className="p-2 rounded-lg text-zinc-400 hover:text-pink-500 hover:bg-zinc-100 transition-colors"
                                title="Random note (Cmd+Shift+R)"
                            >
                                <Shuffle className="size-4" />
                            </button>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-pink-500 hover:bg-zinc-100 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="size-4 text-green-500" />
                                        <span className="text-green-500">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="size-4" />
                                        <span>Share</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <h1 className={`${sourceSerif.className} text-xl md:text-2xl font-semibold text-zinc-900 leading-snug`}>
                        {post.title}
                    </h1>
                    {post.date && <p className="mt-2 text-xs text-zinc-400">{post.date}</p>}
                </header>

                <div className={`${sourceSerif.className} prose prose-sm prose-zinc max-w-none 
                    prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:text-[15px]
                    prose-headings:font-semibold prose-headings:text-zinc-900
                    prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-zinc-900
                    prose-code:text-pink-600 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                    prose-li:text-zinc-700 prose-li:text-[15px]
                    prose-blockquote:border-l-pink-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                    prose-hr:border-zinc-200
                `}>
                    <Markdown
                        options={{
                            overrides: {
                                pre: PreBlock,
                                a: {
                                    props: {
                                        className: "text-pink-500 hover:underline",
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
