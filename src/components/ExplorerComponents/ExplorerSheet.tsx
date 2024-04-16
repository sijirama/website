
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Explorer } from './MyExplorerComponents'
import { useInterface } from '@/store/InterfaceStore'


export default function ExplorerSheet() {
    const { type, isOpen, onClose } = useInterface()
    const isSheetOpen = isOpen && type === "explorer"
    return (
        <Sheet open={isSheetOpen} onOpenChange={onClose}>
            <SheetContent className='block px-2 dark:bg-black'>
                <section className='pr-3 overflow-y-auto h-full w-full my-auto text-base'>
                    <Explorer />
                </section>
            </SheetContent>
        </Sheet>

    )
}
