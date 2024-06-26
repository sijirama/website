import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Directory, File } from '@/lib/library';
import { HiddenFilesandFolders } from './ListOfHiddenFiles';


export function renderAccordionItems(tree: (Directory | File)[], onClick: (path: string) => void) {
    return tree.map((item) => {
        if (HiddenFilesandFolders.includes(item.path)) {
            return null
        }
        if (item.type === 'tree') {
            return (
                <AccordionItem className='border-b-[0.1px] text-xs md:text-sm border-zinc-600' key={item.fullPath} value={item.fullPath}>
                    <AccordionTrigger className='dark:text-zinc-300 text-xs md:text-sm text-left'>{item.path}</AccordionTrigger>
                    <AccordionContent>
                        {renderAccordionItems((item as Directory).files, onClick)} {/* Recursive call */}
                    </AccordionContent>
                </AccordionItem>
            );
        } else {
            return (
                <div className='py-3 px-1.5 bg-slate-700 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-white dark:text-zinc-300 transition-all duration-300 font-bold cursor-pointer text-xs md:text-sm my-2 rounded-lg' key={item.fullPath} onClick={() => onClick(item.fullPath)}>{item.path.slice(0, -3)}</div>
            );
        }
    });
}
