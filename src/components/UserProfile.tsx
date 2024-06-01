import React from "react";
import prisma from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OnBoarding from "@/components/OnBoarding";
import TherapistProfile from "@/components/TherapistProfile";

async function UserProfile() {
  const session = await auth();
  const myUser = await prisma.users.findUnique({
    where: { email: session?.user?.email! },
  });
  const role = myUser?.role;
  return (
    <div className="">
      {!role && <OnBoarding />}
      {role && role === "therapist" && <TherapistProfile />}
      {role && role === "client" && "<ClientProfile />"}
    </div>
  );
}

export default UserProfile;
