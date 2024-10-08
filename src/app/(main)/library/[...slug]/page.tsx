"use client"
import React, { useEffect, useState } from 'react'
import { getFileUrl } from '@/lib/library';
import { CONFIG } from '@/lib/config';
import axios from 'axios';
import { manrope, rubik } from '@/lib/fonts';
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";
import { getPostContent, getPostMetaData } from '@/lib/getPostMetaData';
import matter from 'gray-matter';

export default function Page(props: any) {
    /*
        NOTE: since this dynamic route version ( [...slug] ) catches all the routes to this point
        it returns an array of strings with all the routes included
    */

    const slug = props.params.slug;
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [fileMeta, setFileMeta] = useState<matter.GrayMatterFile<string> | null>(null)

    useEffect(() => {
        const fetchContent = async (path: string[]) => {
            const blobUrl = path.join("/")

            const headers = {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
            };

            const url = getFileUrl(blobUrl)
            const response = await axios.get(url, { headers })
            const encodedContent: string = response.data.content;
            const decodedContent: string = atob(encodedContent); // decode 
            setFileContent(decodedContent);
        }
        fetchContent(slug)
    }, [])

    if (!fileContent) {
        return null
    }

    const fileMetadata = getPostMetaData(fileContent)

    if (fileMetadata.title) {
        const filestuff = getPostContent(fileContent)
        setFileMeta(filestuff)
        setFileContent(filestuff.content)

    }

    return (
        <section className='px-2 lg:px-5 h-full'>
            <h1 className="font-bold text-2xl md:text-3xl -tracking-wider dark:text-zinc-300">
                {fileMeta?.data.title}
            </h1>

            {
                !fileContent ? ("No data yet") : (
                    <article
                        className={`md:max-w-4xl lg:max-w-2xl 3xl:max-w-4xl mmmx-auto prose prose-stone prose-headings:${manrope.className} prose-p:${manrope.className} prose-li:${manrope.className} prose-li:text-zinc-900 dark:prose-li:text-zinc-300 prose-li:text-xs  lg:prose-li:text-base max-w-none prose-code:bg-zinc-400 prose-a:p-1 prose-a:rounded-lg prose-a:bg-zinc-300 dark:prose-a:bg-[#2C2f32] prose-a:text-[#5d7da5]  prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-zinc-50 prose-p:text-xs lg:prose-p:text-base prose-p:text-slate-800 dark:prose-p:text-slate-300 prose-headings:text-lg md:prose-headings:text-2xl prose-headings:text-slate-800 prose-headings:capitalize dark:prose-headings:text-slate-300`}
                    >
                        <Markdown options={{ overrides: { pre: PreBlock } }}>
                            {fileContent!}
                        </Markdown>
                    </article>

                )}
        </section>
    )
}
