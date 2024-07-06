"use client";
import React, { useEffect, useState } from "react";
import prisma from "@/db";
import {
  approveTherapistAppointment,
  getTherapistAppointments,
  getTherapistServices,
  getTherapistTimings,
} from "@/utils/actions";
import { appointments, services } from "@prisma/client";
import Link from "next/link";
import { Button } from "@nextui-org/button";

function AppointmentsCard({ therapistId }: { therapistId: string }) {
  const [appointments, setAppointments] = useState<appointments[]>();

  useEffect(() => {
    async function getAppointments() {
      const app = await getTherapistAppointments(therapistId);
      setAppointments(app);
    }
    getAppointments();
  }, []);
  return (
    <div>
      {(!appointments || appointments.length === 0) && (
        <div className="flex items-center justify-center text-base">
          No Appointments Yet
        </div>
      )}
      {appointments && (
        <div className="flex flex-col  gap-2 items-center justify-center text-base">
          {appointments &&
            appointments.map((appointment) => (
              <div
                className="rounded-md bg-default-200/70 flex flex-col w-full h-fit p-4"
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
                    <span className="text-default-700">Client :</span>
                    <Link
                      href={`/profile/${appointment.clientId}`}
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

                <div className="flex justify-between items-center gap-2 mt-8">
                  <div className="flex gap-2 items-center">
                    <Button
                      disabled={!!appointment.confirmed}
                      onClick={() => {
                        approveTherapistAppointment(appointment.id);
                      }}
                    >
                      Approve Appointment
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentsCard;
