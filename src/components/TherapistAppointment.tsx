"use client"
import React from 'react';
import {Card, CardBody} from "@nextui-org/card";
import {Tab, Tabs} from "@nextui-org/tabs";
import {getTherapistAppointments} from "@/utils/actions";

function TherapistAppointment({id}: { id: string }) {
    const appointments = "";
    return (
        <div>
            <Card isBlurred={true} className="bg-zinc-200">
                <CardBody>
                    <div className="flex w-full flex-col">
                        <Tabs aria-label="Appointments" color="primary">
                            <Tab key="Upcoming Appointments" title="Upcoming Appointments">
                                <Card>
                                    <CardBody className="h-[520px] overflow-y-scroll">
                                        {!appointments &&
                                            <div className="flex items-center justify-center text-base">No Appointments
                                                Yet</div>}
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="Past Appointments" title="Past Appointments">
                                <Card>
                                    <CardBody className="h-[520px] overflow-y-scroll">
                                        {!appointments &&
                                            <div className="flex items-center justify-center text-base">No Appointments
                                                Yet</div>}
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