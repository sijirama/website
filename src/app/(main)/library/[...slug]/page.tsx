"use client"
import React, { useEffect, useState } from 'react'
import { getFileUrl } from '@/lib/library';
import { CONFIG } from '@/lib/config';
import axios from 'axios';
import { rubik } from '@/lib/fonts';
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";

export default function Page(props: any) {
    /*
        NOTE: since this dynamic route version ( [...slug] ) catches all the routes to this point
        it returns an array of strings with all the routes included
    */

    const slug = props.params.slug; 
    const [fileContent, setFileContent] = useState<string | null>(null)

    useEffect(() => {
        const fetchContent = async (path: string[]) => {
            const blobUrl = path.join("/")
            console.log(blobUrl)

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

    return (
        <section className=' px-5 max-h-full overflow-y-auto'>
            {
                !fileContent ? ("No data yet") : (
                    <article
                        className={`prose prose-stone prose-p:${rubik.className} max-w-none mx-auto prose-code:bg-zinc-400 prose-a:text-zinc-500 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-zinc-50 prose-p:text-sm prose-p:text-zinc-300 md:prose-p:text-base prose-headings:text-lg md:prose-headings:text-2xl prose-headings:text-zinc-100`}
                    >
                        <Markdown options={{ overrides: { pre: PreBlock } }}>
                            {fileContent!}
                        </Markdown>
                    </article>

                )}
        </section>
    )
}
