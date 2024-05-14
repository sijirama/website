"use client"
import { useRouter } from 'next/navigation'
import { isTherePathStored, getItemForPath } from '@/store/pathStorage'
import { useEffect } from 'react';

export default function Page() {

    const router = useRouter()

    useEffect(() => {
        if (isTherePathStored()) {
            const storedPath = getItemForPath();
            if (storedPath) {
                router.push(`/library/${storedPath}`);
            } else if (storedPath == null || storedPath.length < 2) {
                router.push(`/library/Home.md`);
            } else {
                router.push(`/library/Home.md`);
            }
        } else {
            router.push(`/library/Home.md`);
        }
    }, []);


    return null

}
