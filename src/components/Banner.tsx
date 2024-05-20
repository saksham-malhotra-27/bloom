"use client"
import React from 'react';
import Image from "next/image";
import {lato, poppins} from "@/utils/fonts";
import {TypeAnimation} from "react-type-animation";
import {Button, ButtonGroup} from "@nextui-org/button";
import {MessageCircleDashed} from "lucide-react";

function Banner() {
    return (
        <div className="h-screen w-full flex items-center">
            <div className="basis-1/2 z-10 flex flex-col text-6xl">
                <div className={poppins.className}>
                    <span className={`block text-primary font-semibold text-9xl ${lato.className}`}>Bloom</span>
                    <span className=" text-4xl mt-5">Talk anonymously, because </span>
                    <span className="text-4xl bg-primary/50 px-2 rounded-md font-semibold "> Everyone</span>
                    <span className="text-4xl"> deserves to be </span>
                    <span className="text-4xl bg-primary/50 px-2 rounded-md ">
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Heard',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Happy',
                                1000,
                                'Understood',
                                1000,
                                'Supported',
                                1000,
                                'Free',
                                1000,
                            ]}
                            wrapper="span"
                            speed={1}
                            style={{fontSize: 'text-4xl'}}
                            repeat={Infinity}
                        />
                    </span>
                </div>

                <div className="flex gap-2 items-center mt-6">
                    <Button size="lg" variant="light" color="primary"
                            className="text-black"><span><MessageCircleDashed/></span>Chat anonymously</Button>
                    <Button size="lg" variant="light">Talk to Therapists</Button>
                </div>

                <Image src="/abstract_art2.png" alt="banner image of a woman therapist" quality="100" priority={true}
                       width="2000" height="1000" className="w-auto h-[20%] opacity-50 absolute left-10 top-32 -rotate-12 "/>

                <Image src="/abstract_art3.png" alt="banner image of a woman therapist" quality="100" priority={true}
                       width="500" height="800" className="w-[15%] opacity-50 absolute left-[35%] bottom-10 -rotate-12 "/>
            </div>

            <div className="basis-1/2">
                <Image src="/abstract_bg.png" alt="banner image of a woman therapist" quality="100" priority={true}
                       width="2000" height="1000" className="w-[40%] absolute right-0 bottom-0 "/>
                <Image src="/banner_image.png" alt="banner image of a woman therapist" quality="100" priority={true}
                       width="2000" height="1000" className="w-[60%] absolute right-0 bottom-0 "/>
            </div>
        </div>
    );
}

export default Banner;