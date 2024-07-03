import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "@nextui-org/button";
import prisma from "@/db";
import Link from "next/link";

async function SignInComponent() {
  const session = await auth();
  let user;
  if (session)
    user = await prisma.users.findUnique({ where: { id: session.user!.id } });
  return (
    <div>
      {!session?.user ? (
        <div className="">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button
              variant="solid"
              color="primary"
              className="text-white"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex gap-2">
          {user?.role === "therapist" && (
            <Link href={`/blogs/create/${user?.id}`}>
              <Button
                variant="ghost"
                color="primary"
                className=""
                type="submit"
              >
                Write an Article
              </Button>
            </Link>
          )}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              variant="solid"
              color="primary"
              className="text-white"
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignInComponent;
