import React from 'react';
import prisma from "@/db";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import OnBoarding from "@/components/OnBoarding";

async function UserProfile() {
    const session = await auth()
    const myUser = await prisma.users.findUnique({
        where: { email: session?.user?.email! },
    });
    const role = myUser?.role;
    return (
        <div className="">
            {!role &&  <OnBoarding/>}
            {role && "Hi there manav"}
        </div>
    );
}

export default UserProfile;