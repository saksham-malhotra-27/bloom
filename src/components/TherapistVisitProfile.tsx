import React from "react";
import { auth } from "@/auth";
import prisma from "@/db";
import TherapistInfoCard from "@/components/TherapistInfoCard";
import TherapistAppointment from "@/components/TherapistAppointment";
import BookTherapistCard from "@/components/BookTherapistCard";
import TherapistReviews from "@/components/TherapistReviews";

async function TherapistVisitProfile({ userId }: { userId: string }) {
  const session = await auth();
  const therapist = await prisma.therapists.findMany({
    where: { userId: userId },
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="mt-5 md:basis-1/4 rounded-3xl">
        <TherapistInfoCard therapist={therapist[0]!} />
      </div>

      <div className="bg-zinc-200/30 mt-5 md:basis-3/4 flex flex-col md:flex-row gap-2 md:gap-0 rounded-xl">
        <div className="m-2 md:basis-1/3">
          <BookTherapistCard therapist={therapist[0]!} />
        </div>
        <div className="m-2 md:basis-2/3">
          <TherapistReviews therapist={therapist[0]!} />
        </div>
      </div>
    </div>
  );
}

export default TherapistVisitProfile;
