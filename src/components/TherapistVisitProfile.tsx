import React from "react";
import { auth } from "@/auth";
import prisma from "@/db";
import TherapistInfoCard from "@/components/TherapistInfoCard";
import TherapistAppointment from "@/components/TherapistAppointment";
import BookTherapistCard from "@/components/BookTherapistCard";

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

      <div className="mt-5 md:basis-3/4">
        <BookTherapistCard therapist={therapist[0]!} />
      </div>
    </div>
  );
}

export default TherapistVisitProfile;
