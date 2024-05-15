"use client"

import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Explorer } from '@/components/ExplorerComponents/MyExplorerComponents';



export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ResizablePanelGroup direction='horizontal' className='max-h-screen'>
        <ResizablePanel defaultSize={25} className='hidden lg:block '>
            <section className='hidden lg:block p-5 overflow-y-auto h-full w-full my-auto text-base'>
                <Explorer />
            </section>
        </ResizablePanel>
        <ResizableHandle withHandle className='bg-zinc-200 hover:bg-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-600 hover:px-2 transition-all duration-300  hidden md:flex ' />
        <ResizablePanel defaultSize={75} >
            <section className='w-full overflow-y-auto h-full'>
                {children}
            </section>
        </ResizablePanel>
    </ResizablePanelGroup>

}
