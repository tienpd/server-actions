'use client'

import {Button} from '@/components/button'
import {Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle} from '@/components/dialog'
import {Field, Label} from '@/components/fieldset'
import {Input} from '@/components/input'
import React, {useState} from 'react'
import {addUser, IAddUserResponse} from "@/app/actions";
import AddButton from "@/app/components/add-button";
import {useFormState} from 'react-dom'

const initialState: IAddUserResponse = {
    message: '',
}

export default function AddUserModal() {
    let [isOpen, setIsOpen] = useState(false)
    const [state, formAction] = useFormState(addUser, initialState)

    const ref = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        if (state.isSuccessful) {
            ref.current?.reset()
            setIsOpen(false)
        }
    }, [state])

    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)}>
                Add User
            </Button>

            <p>{state?.message}</p>

            <Dialog open={isOpen} onClose={setIsOpen}>
                <form ref={ref} action={(formData) => {
                    formAction(formData)
                }}>
                    <DialogTitle>Add new user</DialogTitle>
                    <DialogDescription>
                        Add a new user to your organization. They will receive an email invitation to join your
                        organization.
                    </DialogDescription>
                    <DialogBody>
                        <p className={'text-red-500'}>{state.error}</p>
                        <div className={'grid grid-cols-2 gap-x-5 gap-y-5'}>
                            <Field>
                                <Label>Name</Label>
                                <Input required name="name" placeholder={'Enter user name'}/>
                            </Field>
                            <Field>
                                <Label>Email</Label>
                                <Input required name="email" placeholder={'Enter user email'}/>
                            </Field>
                            <Field>
                                <Label>Role</Label>
                                <Input required name="role" placeholder={'Enter user role'}/>
                            </Field>
                            <Field>
                                <Label>Title</Label>
                                <Input required name="title" placeholder={'Enter user title'}/>
                            </Field>
                            <Field>
                                <Label>Phone</Label>
                                <Input required name="phone" placeholder={'Enter user phone'}/>
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
