"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { services, therapists } from "@prisma/client";
import { Calendar, CalendarDate } from "@nextui-org/calendar";
import {
  CalendarDateTime,
  getLocalTimeZone,
  parseDate,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import {
  bookTherapistAppointment,
  deleteTherapistService,
  getTherapistServices,
  getTherapistTimings,
} from "@/utils/actions";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth";
import FormSubmitButton from "@/components/FormSubmitButton";
import { Spinner } from "@nextui-org/spinner";

function BookTherapistCard({ therapist }: { therapist: therapists }) {
  const { status, data } = useSession();
  const [selectedDate, setSelectedDate] = useState<
    CalendarDate | CalendarDateTime | ZonedDateTime
  >(today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState(8);
  const [signInText, setSignInText] = useState(false);
  const [BookedText, setBookedText] = useState(false);
  const [tservices, setTServices] = useState<services[]>();
  const [timingscbox, setTimingscbox] = useState<string[]>([]);
  const [meetD, setMeetD] = useState(therapist.meetDuration);
  const [meetC, setMeetC] = useState(therapist.sessionCost);
  const [meetM, setMeetM] = useState(therapist.sessionMode);

  useEffect(() => {
    async function getServices() {
      const serv = await getTherapistServices(therapist.userId);
      if (serv) setTServices(serv);
    }

    async function getTimings() {
      const timings = await getTherapistTimings(therapist.userId);
      if (timings) {
        setTimingscbox(timings);
      }
    }

    getServices();
    getTimings();
  }, []);
  return (
    <div>
      <Card isBlurred={true} className="bg-zinc-300/20 h-full ">
        <CardHeader className="text-2xl flex justify-center bg-primary/50">
          <span className={`font-normal`}>Schedule</span>
        </CardHeader>
        <CardBody className="flex justify-center items-center">
          <Calendar
            color="primary"
            defaultValue={parseDate("2024-06-03")}
            minValue={today(getLocalTimeZone())}
            className="text-sm"
            classNames={{
              headerWrapper: "bg-primary rounded-t-md",
              gridHeader: "bg-primary pb-2",
            }}
            value={selectedDate}
            onChange={(v) => {
              setSelectedDate(v);
            }}
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-medium mt-4 mx-10 text-center ">Choose Slot</p>
            <div className="grid grid-cols-2 justify-between gap-2">
              {timingscbox
                .filter((item, index) => index > 0)
                .map((timing) => (
                  <Button
                    key={timing}
                    className="rounded-md px-6 py-2"
                    variant="solid"
                    onClick={() => {
                      setSelectedTime(Number(timing));
                    }}
                  >
                    {timing}:00 {Number(timing) < 12 ? "AM" : "PM"}
                  </Button>
                ))}
            </div>
          </div>
          <form
            className="flex flex-col items-center justify-center mt-4"
            action={async () => {
              if (status === "unauthenticated" || status === "loading") {
                setSignInText(true);
                setBookedText(false);
              } else {
                setSignInText(false);
                await bookTherapistAppointment(
                  data!.user!.id!,
                  therapist.userId,
                  selectedDate.toString(),
                  selectedTime.toString(),
                  meetD,
                  meetC,
                  meetM,
                );
                setBookedText(true);
              }
            }}
          >
            {tservices && (
              <div className="flex flex-col mt-8">
                <p className="text-medium text-center">
                  Additional Service Options
                </p>
                <div className="grid grid-cols-1 text-medium mt-4 gap-2">
                  {tservices &&
                    (tservices as services[]).map((service) => (
                      <div
                        onClick={() => {
                          setMeetC(service.meetingCost);
                          setMeetD(service.meetingDuration);
                          setMeetM(service.meetingType);
                        }}
                        className="rounded-md bg-default-300 p-4 flex flex-col"
                        key={service.id}
                      >
                        <div className=" grid grid-cols-2 md:grid-cols-3 w-full">
                          <div className="flex gap-2">
                            <span className="text-default-700">Mode :</span>
                            <span className="">{service.meetingType}</span>
                          </div>

                          <div className="flex gap-2">
                            <span className="text-default-700">Cost :</span>
                            <span className="">₹ {service.meetingCost}</span>
                          </div>

                          <div className="flex gap-2">
                            <span className="text-default-700">Duration :</span>
                            <span className="">
                              {service.meetingDuration} mins.
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <p className="text-sm my-2 mx-6 text-center">
              Request Appointment on {selectedDate.toString()} at {selectedTime}
              :00 for {meetD} mins. for ₹ {meetC}, {meetM} meeting.
            </p>
            <div className="px-16 flex items-start">
              <FormSubmitButton text="Book Appointment" />
            </div>

            {signInText && (
              <p className="text-sm mt-2 mx-10 text-center text-red-500">
                Sign In is required for booking appointments.
              </p>
            )}

            {BookedText && (
              <p className="text-sm mt-2 mx-10 text-center text-green-500">
                Appointment request sent to the therapist! Waiting for approval
                from the therapist. You can check the progress on your profile
                page.
              </p>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default BookTherapistCard;
