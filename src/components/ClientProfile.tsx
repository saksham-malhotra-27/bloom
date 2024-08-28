import React from "react";
import { auth } from "@/auth";
import Link from "next/link";

async function ClientProfile() {
  const session = await auth();
  let client = await prisma?.client.findUnique({
    where: { email: session!.user!.email! },
  });
  const appointments = await prisma?.appointments.findMany({
    where: { clientId: session?.user?.id },
  });
  return (
    <div className="flex gap-2 flex-col md:flex-row mt-2">
      <div className="md:basis-2/5 bg-slate-200 w-full h-full rounded-lg flex flex-col gap-2 items-center text-base">
        <p className="text-3xl font-semibold mb-4">You</p>
        <p className="">{client?.email}</p>
        <p className="">{client?.phone}</p>
        <p className="">{client?.dob}</p>
      </div>
      <div className="md:basis-3/5 bg-slate-200 w-full h-full rounded-lg flex flex-col gap-2 items-center text-base p-3">
        <p className="text-3xl font-bold mb-4">Your Appointments</p>
        {!appointments && (
          <p className="w-full h-full flex justify-center items-center text-lg text-center">
            No Appointments yet!
          </p>
        )}
        {appointments &&
          appointments.map((appointment) => (
            <div
              className="bg-slate-300 w-full p-2 rounded-lg"
              key={appointment.id}
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                  <span className="text-default-700">Date :</span>
                  <span className="">{appointment.date}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-default-700">Time :</span>
                  <span className="">
                    {appointment.startTime}{" "}
                    {Number(appointment.startTime) < 12 ? (
                      <span className="text-sm">A.M</span>
                    ) : (
                      <span className="text-sm">P.M</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-2 mt-2">
                <div className="flex gap-2">
                  <span className="text-default-700">Meet Cost :</span>
                  <span className="">₹ {appointment.cost}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-default-700">Meet Duration :</span>
                  <span className="">{appointment.duration} mins.</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-default-700">Meet Mode :</span>
                  <span className="">{appointment.mode}</span>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 mt-2">
                <div className="flex gap-2">
                  <span className="text-default-700">Therapist :</span>
                  <Link
                    href={`/profile/${appointment.therapistId}`}
                    className="underline"
                  >
                    {appointment.clientId}
                  </Link>
                </div>

                <div className="flex gap-2">
                  <span className="text-default-700">Approval :</span>
                  <span className="">
                    {appointment.confirmed ? (
                      <span className="text-green-700">Approved</span>
                    ) : (
                      <span className="">Pending</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ClientProfile;
