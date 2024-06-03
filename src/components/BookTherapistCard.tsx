"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { therapists } from "@prisma/client";
import { Calendar, CalendarDate } from "@nextui-org/calendar";
import {
  CalendarDateTime,
  getLocalTimeZone,
  parseDate,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { bookTherapistAppointment } from "@/utils/actions";
import { useSession } from "next-auth/react";
import { signIn } from "@/auth";
import FormSubmitButton from "@/components/FormSubmitButton";

function BookTherapistCard({ therapist }: { therapist: therapists }) {
  const { status, data } = useSession();
  const [selectedDate, setSelectedDate] = useState<
    CalendarDate | CalendarDateTime | ZonedDateTime
  >(today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState(8);
  const [signInText, setSignInText] = useState(false);
  const [BookedText, setBookedText] = useState(false);
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
              <Button
                className="rounded-md px-6 py-2"
                variant="solid"
                onClick={() => {
                  setSelectedTime(8);
                }}
              >
                08:00 AM
              </Button>
              <Button
                className="rounded-md px-6 py-2"
                variant="solid"
                onClick={() => {
                  setSelectedTime(10);
                }}
              >
                10:00 AM
              </Button>

              <Button
                className="rounded-md px-6 py-2"
                variant="solid"
                onClick={() => {
                  setSelectedTime(12);
                }}
              >
                12:00 PM
              </Button>

              <Button
                className="rounded-md px-6 py-2"
                variant="solid"
                onClick={() => {
                  setSelectedTime(14);
                }}
              >
                2:00 PM
              </Button>
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
                );
                setBookedText(true);
              }
            }}
          >
            <p className="text-sm my-2 mx-6 text-center">
              Book Appointment on {selectedDate.toString()} at {selectedTime}:00
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
