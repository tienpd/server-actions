'use client'

import {deleteUser} from "@/app/actions";
import {TrashIcon} from "@heroicons/react/20/solid";
import {useEffect, useTransition} from "react";
import {IAddUserResponse, initialState} from "@/app/components/add-user-modal";
import {useFormState, useFormStatus} from "react-dom";
import toast from "react-hot-toast";

export default function DeleteUser({id}:{id:string}) {
    const onDeleteUser = deleteUser.bind(null, id)
    const [state, formAction] = useFormState(onDeleteUser, initialState)

    console.log(state)

    useEffect(() => {
        if (state.isSuccess) {
            toast.success(state.message)
        }
        if (state.isError) {
            toast.error(state.message)
        }
    }, [state])

    return <div>
        <form action={formAction}>
            <div className="-mt-px flex divide-x divide-gray-200">
                <SubmitButton/>
            </div>
        </form>
    </div>
}


const SubmitButton = () => {
    const {pending} = useFormStatus()

    return <button
        type="submit"
        className="cursor-pointer relative text-red-500 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
    >
        <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
        {pending ? 'Deleting...' : 'Delete'}
    </button>
}
