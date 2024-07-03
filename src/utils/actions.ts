"use server";
import { uploadFile } from "@uploadcare/upload-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/db";
import servicesCard from "@/components/ServicesCard";

export const onBoardUser = async (formData: FormData) => {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const dob = formData.get("dob");
};

export const onBoardTherapist = async (formData: FormData) => {
  const session = await auth();
  const email = session?.user?.email || "email";
  const name = formData.get("name");
  const phone = formData.get("phone");
  const dob = formData.get("dob");
  const location = formData.get("location");
  const rNum = formData.get("registrationNumber");
  const degree = formData.get("degree");
  const experience = formData.get("experience");
  const specialization = formData.get("specialization");
  const meetDuration = formData.get("duration");
  const sessionCost = formData.get("cost");
  const sessionMode = formData.get("mode");
  const docRci = formData.get("docRci");
  const docMalpracticeInsurance = formData.get("docMalInsurance");
  const pfp = <File>formData.get("pfp");
  const bio = formData.get("bio");
  const languages = formData.get("languages");
  const userId = session?.user?.id;
  console.log("Languages : " + languages);

  // image upload
  const file = await pfp.arrayBuffer();
  const fileStream = Buffer.from(file);
  const result = await uploadFile(fileStream, {
    publicKey: process.env.UPLOADCARE_PUBLIC_KEY!,
    store: "auto",
    fileName: email,
  });
  const pfpUrl = result.cdnUrl;
  const therapist = await prisma.therapists.create({
    data: {
      userId: userId || " ",
      email: email,
      name: name!.toString(),
      phone: phone!.toString(),
      dob: dob?.toString(),
      location: location?.toString() || "data",
      registrationNumber: rNum?.toString() || "data",
      degree: degree?.toString() || "data",
      experience: experience?.toString() || "data",
      specialization: specialization?.toString() || "data",
      meetDuration: meetDuration?.toString() || "data",
      sessionCost: sessionCost?.toString() || "data",
      sessionMode: sessionMode?.toString() || "data",
      RCI_document: docRci?.toString() || "data",
      Malpractice_Insurance_document:
        docMalpracticeInsurance?.toString() || "data",
      profilePic: pfpUrl || "data",
      bio: bio?.toString() || "data",
      stars: 5,
    },
  });

  const user = await prisma?.users.update({
    where: {
      email: email,
    },
    data: {
      role: "therapist",
    },
  });

  revalidatePath(`profile/${user?.id}`);
};

export const getTherapistAppointments = async (id: string) => {
  const appointments = await prisma.appointments.findMany({
    where: { therapistId: id },
  });
  return appointments;
};

export const bookTherapistAppointment = async (
  userId: string,
  therapistId: string,
  date: string,
  startTime: string,
  meetDuration: string,
  meetCost: string,
  meetMode: string,
) => {
  await prisma.appointments.create({
    data: {
      therapistId: therapistId,
      date: date,
      clientId: userId,
      confirmed: false,
      startTime: startTime,
      cost: meetCost,
      mode: meetMode,
      duration: meetDuration,
    },
  });
};

export const approveTherapistAppointment = async (appointmentId: string) => {
  await prisma.appointments.update({
    where: { id: appointmentId },
    data: { confirmed: true },
  });
};

export const addTherapistService = async (formData: FormData) => {
  const therapistId = formData.get("therapistId");
  const meetType = formData.get("meeting-type");
  const meetDuration = formData.get("meeting-duration");
  const meetCost = formData.get("meeting-cost");
  await prisma.services.create({
    data: {
      therapistId: therapistId as string,
      meetingCost: meetCost as string,
      meetingDuration: meetDuration as string,
      meetingType: meetType as string,
    },
  });
};

export const getTherapistServices = async (therapistId: string) => {
  const services = await prisma.services.findMany({
    where: { therapistId: therapistId },
  });
  return services;
};

export const deleteTherapistService = async (serviceId: string) => {
  await prisma.services.delete({ where: { id: serviceId } });
};

export const getTherapistTimings = async (therapistId: string) => {
  const timeSlots = await prisma.therapists.findUnique({
    where: { userId: therapistId },
    select: { timeSlots: true },
  });

  // for (let x in timeSlots?.timeSlots) {
  //   console.log(timeSlots.timeSlots[Number(x)]);
  // }
  return timeSlots?.timeSlots;
};

export const setTherapistTimings = async (
  therapistId: string,
  timeslots: string[],
) => {
  await prisma.therapists.update({
    where: { userId: therapistId },
    data: { timeSlots: timeslots },
  });
};

export async function getUserFromDb(id: string) {
  const therapist = await prisma.therapists.findUnique({
    where: { userId: id },
  });
  return therapist;
}

export async function uploadBlog(
  TherapistId: string,
  formdata: FormData,
  blogContent: string,
) {
  const blogTitle = formdata.get("title") as string;
  const blogAuthor = formdata.get("author") as string;
  const blogStatus = formdata.get("publish-status") as string;
  const blogBio = formdata.get("excerpt") as string;
  let blogTags = formdata.get("tags") as string;
  blogTags = blogTags.replaceAll(", ", ",");
  const blogImage = formdata.get("image") as File;

  // verifying user
  const user = await getUserFromDb(TherapistId);
  const session = await auth();
  if (!user || !session || session.user!.id !== user.id) {
    return;
  }

  // getting the tags;
  let tags = blogTags.split(",");

  // uploading the image
  const file = await blogImage.arrayBuffer();
  const fileStream = Buffer.from(file);
  const result = await uploadFile(fileStream, {
    publicKey: process.env.UPLOADCARE_API_KEY!,
    store: "auto",
  });
  const imageUrl = result.cdnUrl as string;

  await prisma.blogs.create({
    data: {
      url: blogTitle.trim().toLowerCase().replaceAll(" ", "-").substring(0, 20),
      title: blogTitle,
      author: blogAuthor,
      authorId: user.userId,
      status: blogStatus,
      bio: blogBio,
      tags: tags,
      bannerImage: imageUrl,
      likes: 0,
      content: blogContent,
    },
  });
}
