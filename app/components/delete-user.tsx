'use client'

import {TrashIcon} from "@heroicons/react/20/solid";
import {deleteUser} from "@/app/actions";
import {useTransition} from "react";

export default function DeleteUser({id}: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handleDeleteUser = () => {
        startTransition(async () => {
            await deleteUser(id)
        })
    }

    return (
        <div className="flex w-0 flex-1">
            <span
                onClick={() => handleDeleteUser()}
                className="cursor-pointer relative text-red-500 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
            >
                <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                {isPending ? 'Deleting...' : 'Delete'}
            </span>
        </div>
    )
}
