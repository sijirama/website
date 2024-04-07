"use client"
import React, { useEffect, useState } from 'react'
//import { CONFIG } from '@/lib/config';
import axios from 'axios';
import { TreeUrl, getFileUrl, structureRepositoryData } from '@/lib/library';
import { Directory } from '@/lib/library';
import { json } from 'stream/consumers';
import { CONFIG } from '@/lib/config';
import { rubik } from '@/lib/fonts';
import Markdown from "markdown-to-jsx";
import { PreBlock } from "@/lib/syntaxhighlight";

export default function Page() {

    const [tree, setTree] = useState<Directory[] | null>(null)

    const [fileContent, setFileContent] = useState<string | null>(null)

    useEffect(() => {
        const fetchContent = async () => {
            const response = await axios.get(TreeUrl)
            const directory = structureRepositoryData(response.data.tree)
            setTree(directory)
        }
        fetchContent()
    }, [])

    const onClick = async (path: string) => {
        console.log(path)

        const headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
        };

        const url = getFileUrl(path)
        const response = await axios.get(url, { headers })
        const encodedContent: string = response.data.content;
        const decodedContent: string = atob(encodedContent);
        setFileContent(decodedContent);
        //console.log(response.data)
    }

    if (!tree) {
        return null
    }

    return (
        <main className='text-white flex gap-1'>
            <section className='w-1/5'>
                {
                    tree.map((t) => {
                        if (t.type === "tree") {
                            return (
                                <div key={t.fullPath} className='text-blue-950'>
                                    <p>{t.path}</p>
                                    <div className='ml-4'>
                                        {
                                            t.files.map((f) => {
                                                if (f.type == "blob") {
                                                    return <div key={f.fullPath} onClick={() => onClick(f.fullPath)} className='text-green-950'>{f.path}</div>
                                                }
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={t.fullPath} onClick={() => onClick(t.fullPath)} className='text-green-950'>{t.path}</div>
                        )
                    })
                }
            </section>
            <section className='w-3/5'>
                {
                    //JSON.stringify(fileContent ? fileContent : "Nothing is here")
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
            <section className='w-1/5'></section>
        </main >
    )
}
