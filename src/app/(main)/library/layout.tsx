"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TreeUrl, structureRepositoryData } from '@/lib/library';
import { Directory } from '@/lib/library';
import { useRouter } from 'next/navigation';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { CONFIG } from '@/lib/config';


export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [tree, setTree] = useState<Directory[] | null>(null)

    useEffect(() => {
        const headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${CONFIG.GITHUB_TOKEN}`,
        };


        const fetchContent = async () => {
            const response = await axios.get(TreeUrl, { headers })
            const directory = structureRepositoryData(response.data.tree)
            setTree(directory)
        }
        fetchContent()
    }, [])

    const router = useRouter()

    const onClick = async (path: string) => {
        console.log(path)
        router.push(`/library/${path}`)
    }

    if (!tree) {
        return null
    }

    return <main className='text-white flex gap-1 max-h-screen'>
        <ResizablePanelGroup direction='horizontal' className='max-h-[50rem]'>
            <ResizablePanel defaultSize={25} className='bg-red-400 hidden lg:block'>
                <section className='hidden lg:block bg-zinc-950 p-5 overflow-y-auto w-full h-full'>
                    <p>Explorer</p>
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
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} >
                <section className='w-full overflow-y-auto h-full'>
                    {children}
                </section>
            </ResizablePanel>
        </ResizablePanelGroup>
    </main >

}
