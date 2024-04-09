import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Directory, File } from '@/lib/library';


export function renderAccordionItems(tree: (Directory | File)[], onClick: (path: string) => void) {
    return tree.map((item) => {
        if (item.type === 'tree') {
            return (
                <AccordionItem className='border-t-[0.1px] border-zinc-600' key={item.fullPath} value={item.fullPath}>
                    <AccordionTrigger className='dark:text-zinc-300'>{item.path}</AccordionTrigger>
                    <AccordionContent>
                        {renderAccordionItems((item as Directory).files, onClick)} {/* Recursive call */}
                    </AccordionContent>
                </AccordionItem>
            );
        } else {
            return (
                <div className='py-3 px-1.5 bg-orange-300 my-1 rounded-md' key={item.fullPath} onClick={() => onClick(item.fullPath)}>{item.path}</div>
            );
        }
    });
}
