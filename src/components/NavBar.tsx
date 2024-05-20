import Link from 'next/link';
import { TransitionLink } from './TransitionLink';
import {lato} from "@/utils/fonts";
import Image from "next/image";
import { Button } from '@nextui-org/button';

export default function NavBar(){
    return (
        <nav className="z-50 h-14 w-full bg-zinc-50 flex items-center justify-between px-4 fixed top-0 shadow-md">

            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" width="40" height="40" className="select-none"/>
                <h1 className={`${lato.className} text-2xl cursor-pointer select-none `}><Link href="/">Bloom</Link></h1>
            </div>


            <div className="hidden md:block">
                <div className="flex gap-8 text-sm">
                    <TransitionLink href="/" label='Explore Therapists'/>
                    <TransitionLink href="/book" label='Chat Rooms'/>
                    <TransitionLink href="/about" label='Articles'/>
                    <TransitionLink href="/our-mission" label='Our Mission'/>
                </div>
            </div>

            <div className="">
                <Button variant="solid" color="primary" className="text-white">Sign In</Button>
            </div>

        </nav>
    )
}