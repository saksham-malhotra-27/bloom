"use server";
import prisma from "@/db"
import { redirect } from "next/navigation";

interface Therapist {
    sessionCost: string,
    sessionMode: string,
    meetDuration: string, 
    experience: string,
    stars: number
  }

  export const getTherapists = async(formData: FormData) => {
    // Helper function to safely get and trim form data
    const getValue = (key: string): string => {
        const value = formData.get(key);
        return value ? value.toString().trim() : '';
    };

    // Extract and clean values from formData
    const sessionCost = getValue('sessionCost');
    const sessionMode = getValue('sessionMode');
    const meetDuration = getValue('meetDuration');
    const experience = getValue('experience');
    const stars = getValue('stars');

    // Construct searchParams, omitting empty strings
    const searchParams = new URLSearchParams({
        ...(sessionCost && { sessionCost }),
        ...(sessionMode && { sessionMode }),
        ...(meetDuration && { meetDuration }),
        ...(experience && { experience }),
        ...(stars && { stars })
    });
  // console.log('get therapist :', searchParams)
    // Redirect with cleaned searchParams
    redirect(`/explore/?${searchParams.toString()}`);
};
