"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { useFormStatus } from "react-dom";
import { Spinner } from "@nextui-org/spinner";
import {
  addTherapistService,
  deleteTherapistService,
  getTherapistServices,
  getTherapistTimings,
  setTherapistTimings,
} from "@/utils/actions";
import { services, therapists } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";

function ServicesCard({ therapistId }: { therapistId: string }) {
  const [formVisible, setFormVisible] = useState(false);
  const { pending, data, method, action } = useFormStatus();
  const [tservices, setTServices] = useState<services[]>();
  const [timingscbox, setTimingscbox] = useState<string[]>([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    async function getServices() {
      const serv = await getTherapistServices(therapistId);
      if (serv) setTServices(serv);
    }

    async function getTimings() {
      const timings = await getTherapistTimings(therapistId);
      if (timings) {
        setTimingscbox(timings);
        console.log(timings);
      }
    }

    getServices();
    getTimings();
  }, [formVisible]);

  const router = useRouter();
  return (
    <div className="flex flex-col">
      <form
        action={async (formData) => {
          await addTherapistService(formData);
          setFormVisible(false);
        }}
        className={clsx(
          "bg-default-200/70 rounded-md p-2 mb-2 flex flex-col",
          !formVisible && "hidden",
          formVisible && "block",
        )}
      >
        <h2 className="text-center text-lg mb-4">Add Service</h2>

        <div className="flex justify-between">
          <Select
            label="Select meeting type"
            className="max-w-xs"
            size="sm"
            name="meeting-type"
            isRequired={true}
          >
            <SelectItem key="online"> online</SelectItem>
            <SelectItem key="in-person"> in-person</SelectItem>
          </Select>

          <Select
            label="Select meeting duration"
            className="max-w-xs"
            size="sm"
            name="meeting-duration"
            isRequired={true}
          >
            <SelectItem key="30">30 minutes</SelectItem>
            <SelectItem key="45">45 minutes</SelectItem>
            <SelectItem key="60">60 minutes</SelectItem>
            <SelectItem key="90">90 minutes</SelectItem>
            <SelectItem key="120">120 minutes</SelectItem>
          </Select>

          <Input
            label="Add cost (INR)"
            className="max-w-xs"
            size="sm"
            name="meeting-cost"
            type="number"
            isRequired={true}
          />
        </div>
        <input name="therapistId" value={therapistId} className="hidden" />
        <Button className="w-full py-6 mt-4" color="default" type="submit">
          {pending ? <Spinner color="current" /> : "Add Service"}
        </Button>
      </form>
      <Button
        className="w-full py-6"
        color="primary"
        onClick={() => {
          setFormVisible(!formVisible);
        }}
      >
        {formVisible ? "Cancel" : "Add Service"}
      </Button>

      {!tservices && (
        <div className="flex items-center justify-center text-medium mt-4">
          No services added
        </div>
      )}

      {tservices && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 text-medium mt-4 gap-2">
          {tservices &&
            (tservices as services[]).map((service) => (
              <div
                className="rounded-md bg-default-200/70 p-4 flex flex-col"
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
                    <span className="">{service.meetingDuration} mins.</span>
                  </div>
                </div>
                <Button
                  className="mt-4"
                  disabled={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    deleteTherapistService(service.id);
                    setButtonLoading(false);
                  }}
                >
                  {!buttonLoading ? (
                    "Delete Service"
                  ) : (
                    <Spinner color="current" />
                  )}
                </Button>
              </div>
            ))}
        </div>
      )}

      <div className="rounded-md bg-default-200/70 w-full px-4 pt-4 mt-2">
        <CheckboxGroup
          label="Select your time slots"
          orientation="horizontal"
          value={timingscbox}
          onValueChange={(val) => {
            setTimingscbox(val);
          }}
          className="text-center flex justify-center items-center"
          color="primary"
        >
          <Checkbox value="8">08:00 am</Checkbox>
          <Checkbox value="10">10:00 am</Checkbox>
          <Checkbox value="12">12:00 pm</Checkbox>
          <Checkbox value="14">02:00 pm</Checkbox>
        </CheckboxGroup>
        <Button
          className="flex justify-center my-4 w-full"
          disabled={buttonLoading}
          onClick={async () => {
            setButtonLoading(true);
            await setTherapistTimings(therapistId, timingscbox);
            setButtonLoading(false);
          }}
        >
          {!buttonLoading ? "Update" : <Spinner color="current" />}
        </Button>
      </div>
    </div>
  );
}

export default ServicesCard;
