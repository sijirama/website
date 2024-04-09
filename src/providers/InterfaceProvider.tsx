'use client'
import ExplorerSheet from "@/components/ExplorerComponents/ExplorerSheet";
import { useEffect, useState } from "react";

export function InterfaceProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ExplorerSheet />
        </>
    )

}
