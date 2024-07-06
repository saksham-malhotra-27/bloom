import React from "react";
import MiniCard from "@/components/MiniCard";
import { Checkbox } from "@nextui-org/checkbox";
import prisma from "@/db";
import { Input } from "@nextui-org/input";
import { getTherapists } from "@/actions/getTherapist";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import ExplorePageForm from "@/components/ExplorePageForm";
import Image from "next/image";

interface Therapist {
  id: string;
  sessionCost: string;
  sessionMode: string;
  profilePic: string;
  name: string;
  meetDuration: string;
  experience: string;
  stars: number;
  location: string;
}

interface PageProps {
  sessionCost?: string;
  sessionMode?: string;
  meetDuration?: string;
  experience?: string;
  stars?: string;
}

function cleanObject<T>(obj: T): T {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}

async function page({ searchParams }: { searchParams: PageProps }) {
  //console.log('searchp',searchParams)
  let Object = {};
  const cleanedSearchParams = cleanObject(searchParams);
  if (cleanedSearchParams.stars)
    Object = { ...cleanedSearchParams, stars: Number(searchParams?.stars) };
  else Object = { ...cleanedSearchParams };
  // console.log(Object)
  const therapists = await prisma?.therapists.findMany({
    where: {
      ...Object,
    },
    select: {
      id: true,
      sessionCost: true,
      sessionMode: true,
      profilePic: true,
      name: true,
      meetDuration: true,
      experience: true,
      stars: true,
      location: true,
      userId: true,
    },
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-1 md:gap-4 max-w-7xl mx-auto">
      <div className="w-full md:basis-2/6">
        <ExplorePageForm />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:basis-4/6 max-h-[85vh] overflow-y-scroll mt-5 p-4 gap-2
                bg-default-200/30 rounded-lg"
        id="result"
      >
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
        {therapists.map((therapist) => (
          <MiniCard key={therapist.id} therapist={therapist} />
        ))}
      </div>
    </div>
  );
}

export default page;
