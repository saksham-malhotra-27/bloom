import React from "react";
import prisma from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OnBoarding from "@/components/OnBoarding";
import TherapistProfile from "@/components/TherapistProfile";
import TherapistVisitProfile from "@/components/TherapistVisitProfile";

async function UserVisitProfile({ userId }: { userId: string }) {
  const myUser = await prisma.users.findUnique({
    where: { id: userId },
  });
  const role = myUser?.role;
  return (
    <div className="">
      {!role && "<ShowUserNotOnboarderdYet />"}
      {role && role === "therapist" && (
        <TherapistVisitProfile userId={userId} />
      )}
      {role && role === "client" && (
        <p className="w-full h-full flex justify-center items-center text-lg mt-4 text-center">
          Oops! Seems like you visited a client profile! <br /> We do not share
          our client data
        </p>
      )}
    </div>
  );
}

export default UserVisitProfile;
