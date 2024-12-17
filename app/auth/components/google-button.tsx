'use client'

import { googleAutenticate } from "@/app/actions/auth/google-login"
import { Button } from "@/components/ui/button"
import { useActionState } from "react"
import { BsGoogle } from "react-icons/bs"

const GoogleLogin = () => {
    const [errorMsGoogle, dispatchGoogle] = useActionState(googleAutenticate, undefined)

    return (
        <form className="flex mt-4" action={dispatchGoogle}>
            <Button variant="outline" className="flex flex-row items-center gap-3 w-full">
                <BsGoogle />
                Sign in with Google
            </Button>
            <p>{errorMsGoogle?.error}</p>
        </form>
    )
}

export default GoogleLogin