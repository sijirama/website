"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TreeUrl, structureRepositoryData } from '@/lib/library';
import { Directory } from '@/lib/library';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@/lib/config';
import {
    Accordion,
} from "@/components/ui/accordion"
import { renderAccordionItems } from '@/components/ExplorerComponents/Tree';
import { setItemForPath } from '@/store/pathStorage';



export function Explorer() {

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
        setItemForPath(path)
        router.push(`/library/${path}`)
    }

    if (!tree) {
        return null
    }

    return <Accordion type='multiple'>
        {renderAccordionItems(tree, onClick)}
    </Accordion>


}
