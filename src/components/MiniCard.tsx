import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { auth } from "@/auth";
import {
  BadgeCheck,
  BadgeIndianRupee,
  Briefcase,
  Clock3,
  Globe2,
  LocateFixed,
  LocateIcon,
  MapPin,
  Pencil,
  UserRoundCheck,
  UserRoundMinusIcon,
  UserRoundX,
} from "lucide-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import TherapistAppointment from "@/components/TherapistAppointment";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";

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
  userId: string;
}

async function TherapistProfile({ therapist }: { therapist: Therapist }) {
  return (
    <Card className="bg-default-200/50 hover:bg-default-300" shadow="sm">
      <CardBody>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="bg-default-200 p-2 rounded-xl items-center overflow-hidden h-full">
            <Image
              src={therapist?.profilePic}
              alt=""
              width={200}
              height={200}
              className="w-52 h-52 items-center"
            />
          </div>

          <div className="flex flex-col justify-between items-center w-full">
            <h3 className="font-semibold text-foreground/90 text-lg text-center">
              {therapist?.name}
            </h3>

            <div className="flex w-full items-center justify-between mt-2 px-2 text-slate-700">
              <div className="flex items-center gap-1">
                <Clock3 size="15" />
                <p className="text-small">{therapist?.meetDuration} minutes</p>
              </div>

              <div className="flex gap-1">
                {/*<p className="text-base text-center">Location : therapist?.location</p>*/}
                <p className="text-small">₹ {therapist?.sessionCost}</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between mt-2 px-2 text-slate-700">
              <div className="flex items-center gap-1">
                <Briefcase size="15" />
                <p className="text-small">{therapist?.experience} Years</p>
              </div>

              <div className="flex items-center gap-1">
                <Globe2 size="15" />
                <p className="text-small">{therapist?.sessionMode}</p>
              </div>
            </div>

            <div className="flex w-full items-center mt-4 px-2 text-slate-700 justify-center">
              <div className="flex items-center gap-1">
                <MapPin size="15" />
                <p className="text-small flex flex-col justify-center h-16">
                  {" "}
                  {therapist?.location}
                </p>
              </div>
            </div>
            <Button className="mt-4 w-full" color="primary">
              <Link href={`/profile/${therapist.userId}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TherapistProfile;
