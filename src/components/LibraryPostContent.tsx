"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getFileUrl } from "@/lib/library";
import { CONFIG } from "@/lib/config";
import axios from "axios";
import { caveat, dmSans, manrope } from "@/lib/fonts";
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";
import { getPostContent } from "@/lib/getPostMetaData";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Share2, Check, Shuffle } from "lucide-react";
import { decodeBase64 } from "@/lib/utils";

interface PostData {
    title: string;
    content: string;
    [key: string]: any;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
    seedling: { label: "seedling", color: "bg-emerald-100 text-emerald-700" },
    budding: { label: "budding", color: "bg-amber-100 text-amber-700" },
    evergreen: { label: "evergreen", color: "bg-green-100 text-green-800" },
};

function HandwrittenBlockquote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote
            className={`${caveat.className} my-6 pl-4 text-xl text-zinc-600 leading-snug not-prose border-l-2 border-pink-300`}
        >
            {children}
        </blockquote>
    );
}

export default function LibraryPostContent({ slug, allNotes }: { slug: string[]; allNotes?: string[] }) {
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const handleShare = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRandomNote = useCallback(() => {
        if (allNotes && allNotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allNotes.length);
            router.push(`/library/${allNotes[randomIndex]}`);
        }
    }, [allNotes, router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
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
                        setPost({ title: parsedPost.data.title || contentTitle || "Untitled", content: cleanContent, ...parsedPost.data });
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
                    setPost({ title: parsedPost.data.title || contentTitle || "Untitled", content: cleanContent, ...parsedPost.data });
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
            <div className={`${dmSans.className} p-4 md:p-6 bg-zinc-50 min-h-screen`}>
                <div className="max-w-3xl mx-auto">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-8 h-8 rounded-md bg-zinc-200 animate-pulse" />
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-lg bg-zinc-200 animate-pulse" />
                            <div className="w-20 h-8 rounded-lg bg-zinc-200 animate-pulse" />
                        </div>
                    </div>
                    {/* Title */}
                    <div className="space-y-3 mb-8">
                        <div className="h-8 w-3/4 rounded-md bg-zinc-200 animate-pulse" />
                        <div className="h-4 w-1/2 rounded-md bg-zinc-100 animate-pulse" />
                        <div className="flex gap-2 pt-1">
                            <div className="h-4 w-16 rounded-full bg-zinc-100 animate-pulse" />
                            <div className="h-4 w-20 rounded-full bg-zinc-100 animate-pulse" />
                            <div className="h-4 w-14 rounded-full bg-zinc-100 animate-pulse" />
                        </div>
                    </div>
                    {/* Body paragraphs */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-full rounded bg-zinc-100 animate-pulse" />
                                <div className="h-4 w-full rounded bg-zinc-100 animate-pulse" />
                                <div className="h-4 w-5/6 rounded bg-zinc-100 animate-pulse" />
                                <div className="h-4 w-4/5 rounded bg-zinc-100 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!post) return null;

    const tags: string[] = Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
            ? post.tags.split(",").map((t: string) => t.trim())
            : [];

    const status = post.status && STATUS_MAP[post.status] ? STATUS_MAP[post.status] : null;
    const isHandwritten = post.style === "handwritten";
    const postLink = post.link ? (() => { try { return new URL(post.link); } catch { return null; } })() : null;

    return (
        <div className={`${dmSans.className} p-4 md:p-6 bg-zinc-50 min-h-screen`}>
            <article className="max-w-3xl mx-auto">

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8">
                    <SidebarTrigger className="border border-zinc-200 bg-white shadow-sm text-zinc-600 hover:text-pink-500 hover:border-pink-200 transition-colors rounded-md p-1.5 h-auto w-auto" />
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleRandomNote}
                            className="p-2 rounded-lg text-zinc-400 hover:text-pink-500 hover:bg-zinc-100 transition-colors"
                            title="Random note (Cmd+Shift+R)"
                        >
                            <Shuffle className="size-4" />
                        </button>
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

                {/* Header / Metadata */}
                <header className="mb-8 space-y-3">
                    <h1 className={`${isHandwritten ? caveat.className : manrope.className} ${isHandwritten ? "text-4xl md:text-5xl font-normal" : "text-2xl md:text-3xl font-bold tracking-tight"} text-zinc-900 leading-snug`}>
                        {post.title}
                    </h1>

                    {post.description && (
                        <p className="text-sm text-zinc-500 leading-relaxed">{post.description}</p>
                    )}

                    <div className="flex items-center flex-wrap gap-2 pt-1">
                        {post.date && (
                            <span className="text-xs text-zinc-400">{String(post.date)}</span>
                        )}

                        {post.date && (tags.length > 0 || status) && (
                            <span className="text-zinc-300">·</span>
                        )}

                        {status && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                                {status.label}
                            </span>
                        )}

                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                    {postLink && (
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-pink-500 transition-colors group w-fit"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-pink-400 transition-colors shrink-0" />
                            <span className="underline underline-offset-2 decoration-zinc-200 group-hover:decoration-pink-300">{postLink.hostname}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </a>
                    )}
                </header>

                {/* Content */}
                <div className={`${isHandwritten ? caveat.className : dmSans.className} prose prose-zinc max-w-none
                    ${isHandwritten ? "prose-lg prose-p:text-[22px] prose-p:leading-snug prose-headings:font-normal" : "prose-base prose-p:text-[15px] prose-p:leading-relaxed prose-headings:font-semibold"}
                    prose-p:text-zinc-700
                    prose-headings:text-zinc-900
                    prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
                    prose-strong:font-normal
                    prose-code:text-pink-600 prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                    prose-li:text-zinc-700
                    prose-hr:border-zinc-200
                `}>
                    <Markdown
                        options={{
                            overrides: {
                                pre: PreBlock,
                                blockquote: HandwrittenBlockquote,
                                strong: ({ children }: { children: React.ReactNode }) => (
                                    <mark className={isHandwritten
                                        ? "bg-pink-100 text-pink-900 px-0.5 rounded-sm not-italic font-normal"
                                        : "bg-yellow-100 text-zinc-900 px-0.5 rounded-sm font-normal"
                                    }>
                                        {children}
                                    </mark>
                                ),
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
