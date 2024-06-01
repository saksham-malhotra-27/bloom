"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { therapists } from "@prisma/client";
import { DateInput } from "@nextui-org/date-input";

function BookTherapistCard({ therapist }: { therapist: therapists }) {
  const appointments = "";
  return (
    <div>
      <Card isBlurred={true} className="bg-zinc-200">
        <CardBody>
          <DateInput />
        </CardBody>
      </Card>
    </div>
  );
}

export default BookTherapistCard;
