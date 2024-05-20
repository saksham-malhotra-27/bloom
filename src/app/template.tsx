"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/utils/animate";
import { lato } from "@/utils/fonts";


export default function({children}: {children:React.ReactNode}){
    useEffect(()=>{
        animatePageIn();
    }, [])

    return(
        <div className={`${lato.className} text-7xl z-40`}>
            <div id="banner-1" className="z-40 flex items-center justify-center min-h-screen  bg-slate-50  text-slate-950 fixed left-0 w-1/5">     B</div>
            <div id="banner-2" className="z-40 flex items-center justify-center min-h-screen  bg-slate-100 text-slate-950 fixed left-[20%] w-1/5">L</div>
            <div id="banner-3" className="z-40 flex items-center justify-center min-h-screen  bg-slate-200 text-slate-950 fixed left-[40%] w-1/5">O</div>
            <div id="banner-4" className="z-40 flex items-center justify-center min-h-screen  bg-slate-300 text-slate-950 fixed left-[60%] w-1/5">O</div>
            <div id="banner-5" className="z-40 flex items-center justify-center min-h-screen  bg-slate-300 text-slate-950 fixed left-[80%] w-1/5">M</div>
            {children}
        </div>
    )
}