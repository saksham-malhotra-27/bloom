import React from "react";
import Link from "next/link";
import {
  Clock3,
  MapPin,
  Pencil,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { therapists } from "@prisma/client";
import { auth } from "@/auth";

async function TherapistInfoCard({ therapist }: { therapist: therapists }) {
  const session = await auth();
  return (
    <Card isBlurred={true} className=" bg-zinc-100 text-stone-900 h-fit p-0">
      {session?.user?.id === therapist?.userId && (
        <div className="w-full h-[24%] bg-primary absolute rounded-b-[30%]">
          <div className="w-12 h-12 bg-black/30 hover:bg-black/40 hover:cursor-pointer z-20 rounded-full flex items-center justify-center absolute right-2 top-2">
            <Link href={`/edit`}>
              <Pencil />
            </Link>
          </div>
        </div>
      )}
      <CardHeader className="flex flex-col justify-center">
        <div className="bg-zinc-200 w-52 h-52 rounded-3xl overflow-hidden flex items-center justify-center">
          <img src={therapist?.profilePic} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mt-2">{therapist?.name}</h2>
          <h2 className="text-base font-bold">Therapist</h2>
        </div>

        <div className="mt-1">
          {!therapist?.verified && (
            <div className="flex items-center justify-center gap-1">
              <UserRoundX className="w-4 h-4 text-red-900" />
              <h3 className="text-sm text-center text-red-900">
                Waiting for Verification
              </h3>
            </div>
          )}
          {therapist?.verified && (
            <div className="flex items-center justify-center gap-1">
              <UserRoundCheck className="w-4 h-4 text-green-900" />
              <h3 className="text-sm text-center text-green-900">Verified </h3>
            </div>
          )}
        </div>
      </CardHeader>
      <CardBody className="overflow-x-hidden">
        {!therapist && <p>No account found</p>}

        {therapist && (
          <div className="">
            <div className="flex items-center justify-center mt-1 gap-1">
              <MapPin className="w-4 h-4" />
              <h3 className="text-base text-center">{therapist?.location} </h3>
            </div>

            {/*  Specialization & Experience  */}
            <div className="flex w-full justify-between mt-4 gap-1">
              <div className="flex basis-3/5 ">
                <p className="text-sm">
                  <span className="text-black ">Specialization</span> :{" "}
                  {therapist?.specialization}
                </p>
              </div>

              <div className="flex basis-2/5  justify-end">
                <p className="text-sm">
                  <span className="text-black ">Experience</span> :{" "}
                  {therapist?.experience} years
                </p>
              </div>
            </div>

            {/*  Session Details*/}
            <div className="flex w-full justify-between mt-4 gap-1">
              <div className="flex basis-2/6 ">
                <p className="text-sm flex items-center gap-1">
                  <span className="text-black ">
                    <Clock3 className="w-4 h-4" />
                  </span>{" "}
                  {therapist.meetDuration} mins.
                </p>
              </div>

              <div className="flex basis-2/6 justify-center">
                <p className="text-sm flex items-center gap-1">
                  <span className="text-black ">₹</span> {therapist.sessionCost}
                </p>
              </div>

              <div className="flex basis-2/6 justify-end">
                <p className="text-sm flex items-center gap-1">
                  <span className="text-black ">Mode</span> :{" "}
                  {therapist.sessionMode}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-6">
              <h2 className="text-sm text-center text-black">Bio</h2>
              <h3 className="text-sm text-center">{therapist.bio}</h3>
            </div>
          </div>
        )}

        <div className="w-full h-[2%] bg-primary absolute left-0 bottom-0 "></div>
      </CardBody>
    </Card>
  );
}

export default TherapistInfoCard;
