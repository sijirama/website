"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Directory } from '@/lib/library';
import { useRouter } from 'next/navigation';
import {
    Accordion,
} from "@/components/ui/accordion"
import { renderAccordionItems } from '@/components/ExplorerComponents/Tree';
import { setItemForPath } from '@/store/pathStorage';

import { useInterface } from '@/store/InterfaceStore'


export function Explorer() {
    const [tree, setTree] = useState<Directory[] | null>(null)
    const { onClose } = useInterface()

    useEffect(() => {
        const fetchContent = async () => {
            const response = await axios.get("/api/explorer")
            setTree(response.data.directory)
        }
        fetchContent()
    }, [])

    const router = useRouter()

    const onClick = async (path: string) => {
        setItemForPath(path)
        router.push(`/library/${path}`)
        onClose()
    }

    if (!tree) {
        return null
    }

    return <Accordion type='multiple'>
        {renderAccordionItems(tree, onClick)}
    </Accordion>


}
