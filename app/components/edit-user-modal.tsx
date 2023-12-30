'use client'

import {Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle} from "@/components/dialog";
import {Field, Label} from "@/components/fieldset";
import {Input} from "@/components/input";
import {Button} from "@/components/button";
import AddButton from "@/app/components/add-button";
import React, {useState, useTransition} from "react";
import {useFormState} from "react-dom";
import { getUser, IAddUserResponse, updateUser} from "@/app/actions";
import {TrashIcon} from "@heroicons/react/20/solid";
import {User} from "@prisma/client";

const initialState: IAddUserResponse = {
    message: '',
}

export default function EdiUserModal({id}: {id: string}){
    const [isOpen, setIsOpen] = useState(false)
    const updateUserWithId = updateUser.bind(null, id)
    const [state, formAction] = useFormState(updateUserWithId, initialState)
    const [data, setData] = useState<User | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const ref = React.useRef<HTMLFormElement>(null)

    const onClickUpdate =  () => {
        startTransition(async () => {
            const user = await getUser(id)
            setData(user ?? undefined)
            setIsOpen(true)
        })
    }

    React.useEffect(() => {
        if (state.isSuccessful) {
            ref.current?.reset()
            setIsOpen(false)
        }
    }, [state])
    return (
        <>
            <div className="flex w-0 flex-1">
                <span
                    onClick={onClickUpdate}
                    className="cursor-pointer relative text-gray-500 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
                >
                    <TrashIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
                    Update
                </span>
            </div>

            <Dialog open={isOpen} onClose={setIsOpen}>
                <span>{isPending ? "Loading...." : null}</span>
                <form ref={ref} action={(formData) => {
                    formAction(formData)
                }}>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogDescription>
                        Update user information.
                    </DialogDescription>
                    <DialogBody>
                        <div className={'grid grid-cols-2 gap-x-5 gap-y-5'}>
                            <Field>
                                <Label>Name</Label>
                                <Input defaultValue={data?.name ?? undefined} required name="name" placeholder={'Enter user name'}/>
                            </Field>
                            <Field>
                                <Label>Email</Label>
                                <Input defaultValue={data?.email ?? undefined} required name="email" placeholder={'Enter user email'}/>
                            </Field>
                            <Field>
                                <Label>Role</Label>
                                <Input defaultValue={data?.role ?? undefined} required name="role" placeholder={'Enter user role'}/>
                            </Field>
                            <Field>
                                <Label>Title</Label>
                                <Input defaultValue={data?.title ?? undefined} required name="title" placeholder={'Enter user title'}/>
                            </Field>
                            <Field>
                                <Label>Phone</Label>
                                <Input defaultValue={data?.phone ?? undefined} required name="phone" placeholder={'Enter user phone'}/>
                            </Field>
                        </div>
                    </DialogBody>
                    <DialogActions>
                        <Button plain onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <AddButton/>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
