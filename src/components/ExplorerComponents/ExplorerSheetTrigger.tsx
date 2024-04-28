import { FaRegSquare } from "react-icons/fa";

import React from 'react'
import { useInterface } from "@/store/InterfaceStore";

export default function ExplorerSheetTrigger() {
    const { onOpen } = useInterface()
    const onClick = () => {
        onOpen("explorer")
    }
    return (
        <div onClick={onClick} className="block lg:hidden">
            <FaRegSquare className="text-lg" />
        </div>
    )
}
