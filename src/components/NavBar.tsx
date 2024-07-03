import Link from "next/link";
import { TransitionLink } from "./TransitionLink";
import { lato } from "@/utils/fonts";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { signIn, signOut, auth } from "@/auth";
import SignInComponent from "@/components/SignInComponent";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className="z-50 h-14 w-full bg-zinc-50 flex items-center justify-between px-4 fixed top-0 shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width="40"
          height="40"
          className="select-none"
        />
        <h1
          className={`${lato.className} text-2xl cursor-pointer select-none `}
        >
          <Link href="/">Bloom</Link>
        </h1>
      </div>

      <div className="hidden md:block">
        <div className="flex md:gap-2 gap-8 text-sm">
          <TransitionLink href="/explore" label="Explore Therapists" />
          <TransitionLink href="/book" label="Chat Rooms" />
          <TransitionLink href="/blogs" label="Articles" />
          <TransitionLink href="/our-mission" label="Our Mission" />
          {session?.user && (
            <TransitionLink
              href={`/profile/${session.user?.id}`}
              label="Profile"
            />
          )}
        </div>
      </div>

      <SignInComponent />
    </nav>
  );
}
