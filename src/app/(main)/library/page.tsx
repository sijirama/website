"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TreeUrl, getFileUrl, structureRepositoryData } from '@/lib/library';
import { Directory } from '@/lib/library';
import { CONFIG } from '@/lib/config';

export default function Page() {

    const [tree, setTree] = useState<Directory[] | null>(null)

    const [fileContent, setFileContent] = useState<string | null>(null)

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
    }

    if (!tree) {
        return null
    }

    return (
        <main className='text-white flex gap-1 bg-red-900 h-full'>
            <p>Hello world</p>
        </main >
    )
}
