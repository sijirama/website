import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Directory, File } from '@/lib/library';


export function renderAccordionItems(tree: (Directory | File)[], onClick: (path: string) => void) {
    return tree.map((item) => {
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
                <div className='py-2 px-1.5 bbg-slate-700 hoverr:bg-slate-600 darkk:bg-slate-800 darkk:hover:bg-slate-700 dark:text-zinc-300 text-slate-900 transition-all duration-300 font-bold cursor-pointer text-xs md:text-sm my-2 rounded-lg underline' key={item.fullPath} onClick={() => onClick(item.fullPath)}>{item.path.slice(0, -3)}</div>
            );
        }
    });
}
