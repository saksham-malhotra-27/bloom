"use client"

import {usePathname, useRouter} from "next/navigation"
import { animatePageOut } from "@/utils/animate"
import {poppins, roboto} from "@/utils/fonts";
import {Button} from "@nextui-org/button";

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
    return (
        <Button variant="light" radius="sm" className={`text-md ${poppins.className}`}
                onClick={handleClick}>{label}</Button>
    )
}