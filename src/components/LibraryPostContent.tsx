"use client";
import React, { useEffect, useCallback } from "react";
import { caveat, dmSans, manrope } from "@/lib/fonts";
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Share2, Check, Shuffle, ArrowLeft } from "lucide-react";

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

export default function LibraryPostContent({ post, allNotes }: { post: PostData; allNotes?: string[] }) {
    const [copied, setCopied] = React.useState(false);
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

    const tags: string[] = Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
            ? post.tags.split(",").map((t: string) => t.trim())
            : [];

    const status = post.status && STATUS_MAP[post.status] ? STATUS_MAP[post.status] : null;
    const isHandwritten = post.style === "handwritten";
    const postLink: string | null = typeof post.link === "string" && post.link.startsWith("http") ? post.link : null;
    const postLinkHostname = postLink ? postLink.replace(/^https?:\/\//, "").split("/")[0] : null;

    return (
        <div className={`${dmSans.className} p-4 md:p-6 bg-zinc-50 min-h-screen`}>
            <article className="max-w-3xl mx-auto">

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/library"
                        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-pink-500 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        <span>library</span>
                    </Link>
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
                        {postLink && (
                            <a
                                href={postLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-50 hover:bg-blue-100 hover:text-blue-600 transition-colors px-2 py-0.5 rounded-full"
                            >
                                <span>↗</span>
                                <span>{postLinkHostname}</span>
                            </a>
                        )}
                    </div>
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
