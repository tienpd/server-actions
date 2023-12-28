'use client'

import {Button} from "@/components/button";
import {useFormStatus} from "react-dom";

export default function AddButton() {
    const {pending} = useFormStatus()
    return <Button disabled={pending} type={'submit'}>Submit</Button>
}
