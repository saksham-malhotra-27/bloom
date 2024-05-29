import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {auth} from "@/auth";
import {
    BadgeCheck,
    BadgeIndianRupee,
    Clock3,
    MapPin, Pencil,
    UserRoundCheck,
    UserRoundMinusIcon,
    UserRoundX
} from "lucide-react";
import {Tab, Tabs} from "@nextui-org/tabs";
import TherapistAppointment from "@/components/TherapistAppointment";
import {redirect} from "next/navigation";
import Link from "next/link";

interface Therapist {
  id: string,
  sessionCost: string,
  sessionMode: string,
  profilePic: string,
  name: string, 
  meetDuration: string, 
  experience: string,
  stars: number
}



async function TherapistProfile ({therapist } : {therapist: Therapist}) {
    

    return (
    <>
    <div className="mt-5 md:basis-1/4 rounded-3xl">
    {
    therapist &&     
    <Card
      isBlurred
      className="border-none bg-background/60 w-full dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
          <img src={therapist?.profilePic} alt=""/>
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90 text-3xl">{therapist?.name}</h3>
                <p className="text-small text-foreground/80">{therapist?.meetDuration} mins</p>
                <div className="flex items-center justify-start mt-1 gap-1">

                  {/*<p className="text-base text-center">Location : therapist?.location</p>*/}
                </div>
                <h1 className="text-large font-medium mt-2">
                INR {therapist?.sessionCost}
                </h1>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              
              <div className="flex justify-between">
                <p className="text-small">{therapist?.experience} years experience</p>
              </div>
            </div>

          </div>
        </div>
      </CardBody>
    </Card>}
    </div>
    </>

    );
}

export default TherapistProfile;