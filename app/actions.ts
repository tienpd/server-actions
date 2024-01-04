'use server'

import prisma from "@/lib/prisma";
import {IAddUserResponse} from "@/app/components/add-user-modal";
import {revalidate} from "@/app/page";
import {revalidatePath, revalidateTag} from "next/cache";
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email()
})

export async function addUser(prevSate: IAddUserResponse, formData:FormData): Promise<IAddUserResponse> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const safeValues = schema.safeParse({name, email})

    if(!safeValues.success) {
        console.log(safeValues.error)
     return {
         isError: true,
        message: 'Invalid form data'
     }
    }


    try {
        await prisma.user.create({
            data: {
                name,
                email
            }
        })

        revalidatePath('/')

        return {
            isSuccess: true,
            message: 'User added successfully'
        }

    } catch (e) {
        return {
            isError: true,
            message: 'Error adding user'
        }
    }
}

export async function deleteUser(id: string, prevState: IAddUserResponse, formData: FormData): Promise<IAddUserResponse> {
    try {
        await prisma.user.delete({
            where: {
                id
            }
        })



            revalidatePath('/')

        return {
            isSuccess: true,
            message: 'User deleted successfully'
        }

    }catch (e) {
        return {
            isError: true,
            message: 'Error deleting user'
        }
    }

}
