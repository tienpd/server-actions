'use server'

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function addUser(prevState: any, formData: FormData) {
    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        title: formData.get('title') as string,
        role: formData.get('role') as string,
    }

    await prisma.user.create({
        data: {
            name: rawData.name,
            email: rawData.email,
            phone: rawData.phone,
            title: rawData.title,
            role: rawData.role,
        }
    })

    revalidatePath('/')

    return {message: 'User added'}

}
