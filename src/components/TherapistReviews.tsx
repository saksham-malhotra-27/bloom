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

function TherapistReviews({ therapist }: { therapist: therapists }) {
  return (
    <div>
      <Card isBlurred={true} className="bg-zinc-300/20 h-full ">
        <CardHeader className="text-2xl flex justify-center bg-primary/50">
          <span className={`font-normal`}>Reviews</span>
        </CardHeader>
        <CardBody className="flex justify-center items-center"></CardBody>
      </Card>
    </div>
  );
}

export default TherapistReviews;
