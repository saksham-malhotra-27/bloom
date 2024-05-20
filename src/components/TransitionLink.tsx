"use client"

import {usePathname, useRouter} from "next/navigation"
import { animatePageOut } from "@/utils/animate"

interface Props {
    href:string, 
    label:string

}

export const TransitionLink = ({href, label}: Props)=>{
    const router = useRouter();
    const pathname = usePathname();
    const handleClick =()=>{
        if(pathname!==href){
            animatePageOut(router , href)
        }
    }
    return(
        <button className="text-xl text-neutral-900 hover:text-neutral-700"
        onClick={handleClick}>{label}</button>
    )
}