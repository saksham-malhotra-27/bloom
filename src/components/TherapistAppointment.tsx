"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { getTherapistAppointments } from "@/utils/actions";
import AppointmentsCard from "@/components/AppointmentsCard";
import ServicesCard from "@/components/ServicesCard";

function TherapistAppointment({ id }: { id: string }) {
  return (
    <div>
      <Card isBlurred={true} className="bg-zinc-200">
        <CardBody>
          <div className="flex w-full flex-col">
            <Tabs aria-label="Appointments" color="primary">
              <Tab key="Upcoming Appointments" title="Upcoming Appointments">
                <Card>
                  <CardBody className="h-[520px] overflow-y-scroll">
                    <AppointmentsCard therapistId={id} />
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="Past Appointments" title="Past Appointments">
                <Card>
                  <CardBody className="h-[520px] overflow-y-scroll"></CardBody>
                </Card>
              </Tab>

              <Tab key="My Services" title="My Services">
                <Card>
                  <CardBody className="h-[520px] overflow-y-scroll">
                    <ServicesCard />
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TherapistAppointment;
