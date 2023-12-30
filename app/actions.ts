'use server'

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export type IAddUserResponse = {
    error?: string
    message?: string
    isSuccessful?: boolean
}

export async function addUser(prevState: IAddUserResponse, formData: FormData): Promise<IAddUserResponse> {
    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        title: formData.get('title') as string,
        role: formData.get('role') as string,
    }

    const res = await prisma.user.create({
        data: {
            name: rawData.name,
            email: rawData.email,
            phone: rawData.phone,
            title: rawData.title,
            role: rawData.role,
        }
    }).then((res) => {
        return {
            message: 'User added',
            isSuccessful: true
        }
    })
        .catch((e) => {
            return {
                error: e.message,
                isSuccessful: false,
                message: 'User not added'
            }
        })

    revalidatePath('/')

    return res

}

export async function deleteUser(id: string): Promise<IAddUserResponse> {
    await prisma.user.delete({
        where: {
            id: id
        }
    }).catch((e) => {
        return {
            error: e.message,
            message: 'User not deleted'
        }
    })

    revalidatePath('/')
    return {message: 'User deleted', isSuccessful: true}
}

export async function updateUser(id: string, prevState: IAddUserResponse, formData: FormData): Promise<IAddUserResponse> {
    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        title: formData.get('title') as string,
        role: formData.get('role') as string,
    }

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: rawData.name,
            email: rawData.email,
            phone: rawData.phone,
            title: rawData.title,
            role: rawData.role,
        }
    }).catch((e) => {
        return {
            error: e.message,
            message: 'User not updated'
        }
    })

    revalidatePath('/')
    return {message: 'User updated', isSuccessful: true}
}

export async function getUser(id: string) {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
}
