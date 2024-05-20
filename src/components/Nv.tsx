import Link from 'next/link';
import { TransitionLink } from './TransitionLink';

export default function Nv(){
   return(
    <nav className=" bg-slate-300 text-slate-950 flex flex-row justify-around font-serif font-medium drop-shadow-xl ">

        <TransitionLink href="/" label='Home'/>   
        <TransitionLink href="/book" label='Book'/>          
        <TransitionLink href="/about" label='About'/>   
        <TransitionLink href="/signup" label='Signup'/>    


    </nav>
   )
}