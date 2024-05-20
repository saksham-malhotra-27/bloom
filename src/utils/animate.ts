import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = ()=>{
    const bannerOne = document.getElementById("banner-1")
    const bannerTwo = document.getElementById("banner-2")
    const bannerThree = document.getElementById("banner-3")
    const bannerFour = document.getElementById("banner-4")
    const bannerFive = document.getElementById("banner-5")
   
    if(bannerOne && bannerTwo && bannerThree && bannerFour && bannerFive){
        const tl = gsap.timeline()
        tl.set([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive], {
            yPercent:0,
        }).to([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive], 
            {
                yPercent: 100,
                stagger: 0.1
            }
        )
    }
}

export const animatePageOut = (router: AppRouterInstance, href:string)=>{
    const bannerOne = document.getElementById("banner-1")
    const bannerTwo = document.getElementById("banner-2")
    const bannerThree = document.getElementById("banner-3")
    const bannerFour = document.getElementById("banner-4")
    const bannerFive = document.getElementById("banner-5")
  
    if(bannerOne && bannerTwo && bannerThree && bannerFour && bannerFive){
        const tl = gsap.timeline()
        tl.set([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive], {
            yPercent:-100,
        }).to([bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive], 
            {
                yPercent: 0,
                stagger: 0.2,
                onComplete:()=>{
                    router.push(href)
                }
            }
        )
    }
}