import Link from 'next/link';
import { TransitionLink } from './TransitionLink';
import {lato} from "@/utils/fonts";
import Image from "next/image";
import { Button } from '@nextui-org/button';
import { signIn,signOut, auth } from '@/auth';

export default async function NavBar(){
    const session = await auth()
    return (
        <nav className="z-50 h-14 w-full bg-zinc-50 flex items-center justify-between px-4 fixed top-0 shadow-md">

            <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" width="40" height="40" className="select-none"/>
                <h1 className={`${lato.className} text-2xl cursor-pointer select-none `}><Link href="/">Bloom</Link></h1>
            </div>
               

            <div className="hidden md:block">
                <div className="flex md:gap-2 gap-8 text-sm">
                    <TransitionLink href="/" label='Explore Therapists'/>
                    <TransitionLink href="/book" label='Chat Rooms'/>
                    <TransitionLink href="/about" label='Articles'/>
                    <TransitionLink href="/our-mission" label='Our Mission'/>
                    {session?.user && <TransitionLink href={`/profile/${session.user?.id}`} label='Profile'/>}
                </div>
            </div>
            {
            !session?.user ? 
            <div className="">
                <form
                  action={async () => {
                    "use server"
                    await signIn("google")
                  }}
                >
                <Button variant="solid" color="primary" className="text-white" type='submit'>Sign In</Button>
                </form>
            </div>:
            
              <div className="">
                <form
                  action={async () => {
                    "use server"
                    await signOut()
                  }}
                >
                <Button variant="solid" color="primary" className="text-white" type='submit'>Sign Out</Button>
                </form>
              </div>
            
            
            }
        </nav>
    )
}