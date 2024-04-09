"use client"
import { GetItemForPath, isTherePathStored } from '@/store/pathStorage'
import { useRouter } from 'next/navigation'
import React from 'react'
export default function Page() {

    const router = useRouter()

    if (isTherePathStored()) {
        router.push(`/library/${GetItemForPath()}`)
    } else { router.push(`/library/Home.md`) }

    return null

}
