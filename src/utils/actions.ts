"use server"

export const onBoardUser = async (formData : FormData) => {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const dob = formData.get("dob");

}