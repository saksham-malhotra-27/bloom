"use server"
import {uploadFile} from '@uploadcare/upload-client'
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export const onBoardUser = async (formData: FormData) => {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const dob = formData.get("dob");
}

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

    // image upload
    const file = await pfp.arrayBuffer();
    const fileStream = Buffer.from(file);
    const result = await uploadFile(
        fileStream,
        {
            publicKey: '12ac0e89f68ff51298c5',
            store: 'auto',
            fileName: email,
        }
    )
    const pfpUrl = result.cdnUrl;
    const therapist = await prisma?.therapists.create({
        data: {
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
            Malpractice_Insurance_document: docMalpracticeInsurance?.toString() || "data",
            profilePic: pfpUrl || "data",
            bio: bio?.toString() || "data",
            stars: 5,
        }
    });

    const user = await prisma?.users.update({
        where: {
            email: email,
        },
        data: {
            role : "therapist"
        },
    });

    revalidatePath(`profile/${user?.id}`);

}