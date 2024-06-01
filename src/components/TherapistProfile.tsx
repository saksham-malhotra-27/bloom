import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { auth } from "@/auth";
import {
  BadgeCheck,
  BadgeIndianRupee,
  Clock3,
  MapPin,
  Pencil,
  UserRoundCheck,
  UserRoundMinusIcon,
  UserRoundX,
} from "lucide-react";
import TherapistAppointment from "@/components/TherapistAppointment";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/db";
import TherapistInfoCard from "@/components/TherapistInfoCard";

async function TherapistProfile() {
  const session = await auth();
  const therapist = await prisma.therapists.findUnique({
    where: { email: session?.user?.email || "email" },
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="mt-5 md:basis-1/4 rounded-3xl">
        <TherapistInfoCard therapist={therapist!} />
      </div>

      <div className="mt-5 md:basis-3/4">
        <TherapistAppointment id={therapist!.id} />
      </div>
    </div>
  );
}

export default TherapistProfile;
