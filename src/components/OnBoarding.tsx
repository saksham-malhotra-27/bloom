"use client";
import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { onBoardTherapist, onBoardUser } from "@/utils/actions";
import { auth } from "@/auth";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useSession } from "next-auth/react";

function OnBoarding() {
  const [userType, setUserType] = useState("therapist");
  return (
    <div className="border border-stone-300 shadow-md bg-stone-100 rounded-md m-4 p-2 max-w-3xl mx-auto text-stone-700">
      <div className="flex justify-center text-3xl mb-4">On Boarding</div>

      {userType === "client" && (
        <div className="">
          <form
            action={async (formData) => {
              await onBoardUser(formData);
            }}
          >
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="Name"
                radius="md"
                name="name"
                isRequired={true}
              />
              <Input type="phone" label="Phone" radius="md" name="phone" />
              <DatePicker label="Date of Birth" name="dob" />
            </div>

            <div className="flex flex-col gap-1 mt-8">
              <FormSubmitButton />
              <Button
                onClick={() => {
                  setUserType("therapist");
                }}
                className="w-full border-none"
                variant="ghost"
                radius="md"
              >
                <p className="w-full">Register as Therapist</p>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/*    */}
      {userType === "therapist" && (
        <div className="">
          <form
            action={async (formData) => {
              await onBoardTherapist(formData);
            }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-base text-center">Basic Information</h3>
              <Input
                type="text"
                label="Name"
                radius="md"
                name="name"
                isRequired={true}
              />
              <Input
                type="tel"
                label="Phone"
                radius="md"
                name="phone"
                isRequired={true}
              />
              <DatePicker label="Date of Birth" name="dob" isRequired={true} />
              <Input
                type="text"
                label="Location"
                radius="md"
                name="location"
                isRequired={true}
              />

              <h3 className="text-base text-center">
                Professional Information
              </h3>
              <Input
                type="number"
                label="RCI Registration Number"
                radius="md"
                name="registrationNumber"
                isRequired={true}
              />
              <Input
                type="text"
                label="degree"
                radius="md"
                name="degree"
                isRequired={true}
              />
              <Input
                type="number"
                label="Experience"
                radius="md"
                name="experience"
                isRequired={true}
              />

              <h3 className="text-base text-center">Additional Information</h3>
              <Input
                type="text"
                label="Area of Specialization"
                radius="md"
                name="specialization"
                placeholder="Anxiety, Depression, ..."
                isRequired={true}
              />
              <Input
                type="text"
                label="Session duration (in mins.)"
                radius="md"
                name="duration"
                isRequired={true}
              />
              <Input
                type="number"
                label="Charges for 1 session"
                radius="md"
                name="cost"
                isRequired={true}
              />
              <Input
                type="text"
                label="Session mode (online/in person)"
                radius="md"
                name="mode"
                isRequired={true}
              />

              <h3 className="text-base text-center">Document Proof</h3>
              <Input
                type="url"
                label="Drive link for Scanned copy of RCI Registration Certificate"
                radius="md"
                name="docRci"
                isRequired={true}
              />
              <Input
                type="url"
                label="Drive link for Proof of Malpractice Insurance"
                radius="md"
                name="docMalInsurance"
              />

              <h3 className="text-base text-center">Personal Information</h3>

              <label className="block text-sm font-medium text-gray-500">
                Profile Pic
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                        bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                name="pfp"
              />

              <Textarea
                type="text"
                label="Bio"
                radius="md"
                name="bio"
                isRequired={true}
              />
              <CheckboxGroup
                label="Languages"
                color="warning"
                name="languages"
                size="sm"
                isRequired={true}
                className="ml-2.5"
              >
                <Checkbox value="English">English</Checkbox>
                <Checkbox value="Hindi">Hindi</Checkbox>
                <Checkbox value="Bengali">Bengali</Checkbox>
                <Checkbox value="Marathi">Marathi</Checkbox>
                <Checkbox value="Telugu">Telugu</Checkbox>
                <Checkbox value="Tamil">Tamil</Checkbox>
                <Checkbox value="Gujarati">Gujarati</Checkbox>
                <Checkbox value="Urdu">Urdu</Checkbox>
                <Checkbox value="Kannada">Kannada</Checkbox>
              </CheckboxGroup>
            </div>

            <div className="border border-stone-300 shadow-sm bg-stone-100 rounded-md m-4 p-2  ">
              <div className="flex justify-center text-xl mb-4">Note</div>
              <ul className="text-sm md:text-base">
                <li className="">
                  Users will be able to search you based on your location and
                  Area of Specialization
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1 mt-8">
              <FormSubmitButton />
              <Button
                onClick={() => {
                  setUserType("client");
                }}
                className="w-full border-none"
                variant="ghost"
                radius="md"
              >
                <p className="w-full">Register as Client</p>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default OnBoarding;
