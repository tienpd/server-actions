'use client'

import {Button} from '@/components/button'
import {Dialog, DialogActions, DialogBody,  DialogTitle} from '@/components/dialog'
import {Field, Label} from '@/components/fieldset'
import {Input} from '@/components/input'
import React, {useEffect, useState} from 'react'
import {addUser} from "@/app/actions";
import { useFormState } from 'react-dom'
import toast from "react-hot-toast";
import AddButton from "@/app/components/add-button";


export interface IAddUserResponse {
    isSuccess?: boolean
    isError?: boolean
    message: string
}

export const initialState: IAddUserResponse = {
    message: '',
}

export default function AddUserModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [state, formAction] = useFormState<IAddUserResponse, FormData>(addUser, initialState)

    useEffect(() => {
        if (state.isSuccess) {
            setIsOpen(false)
            toast.success(state.message)
        }

        if (state.isError) {
            toast.error(state.message)
        }
    },[state])

    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)}>
                Add User
            </Button>

            <Dialog open={isOpen} onClose={setIsOpen}>
                <form action={formAction}>
                    <DialogTitle>Add new user</DialogTitle>
                    <DialogBody>
                        <div className={'flex flex-col gap-y-5'}>
                            <Field>
                                <Label>Name</Label>
                                <Input required name="name" placeholder={'Enter user name'}/>
                            </Field>
                            <Field>
                                <Label>Email</Label>
                                <Input required name="email" placeholder={'Enter user email'}/>
                            </Field>
                        </div>
                    </DialogBody>
                    <DialogActions>
                        <Button plain onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <AddButton />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
